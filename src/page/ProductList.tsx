
import React, { useEffect, useMemo, useState } from 'react'
import { useDeleteProductDeleteMutation, useGetProductReadListQuery, usePostProductSendToListMutation, usePostProductSendToUserMutation } from '../service/product.service'
import { ActivityIndicator, Alert, Button, Image, ListRenderItemInfo, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import { IProductRead } from '../../types/response/product.interface';
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';

import { API_URL } from '@env';
import Swiper from 'react-native-swiper';
import { FormInput } from '../components/FormInput'; 
import { ModalContent } from '../components/Modal';
import { Select } from '../components/Select'; 
import { useGetUserReadListQuery } from '../service/user.service';
import { IUserReadListResponse } from '../../types/response/user.interface';
import { useGetListReadListQuery } from '../service/list.service';
import { useAsyncHandler } from '../hook/useAsyncHandler';
import { IListReadListResponse } from '../../types/response/list.interface';


export const ProductList = () => {
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(1);
    const [limit, setLimit] = useState(5);
    const [hasMore, setHasMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState("")
    const [data, setData] = useState<IProductRead[]>([]);

    const { data: productReadListResponse, error: productReadListError, refetch: productReadListRefetch, isLoading, isFetching, currentData } = useGetProductReadListQuery({
        limit,
        page,
        searchTerm
    })
    const { data: userReadListResponse, error: userReadListError, refetch: userReadListRefetch } = useGetUserReadListQuery({})
    const { data: listReadListResponse, error: listReadListError, refetch: listReadListRefetch } = useGetListReadListQuery({})

    const isRefreshing = useMemo(() => {
        return isLoading || isFetching
    }, [isLoading, isFetching])
    useEffect(() => {
        setData([])
        setPage(0)
    },[searchTerm])
    useEffect(() => {
        if (productReadListResponse?.data?.count) {
            setTotal(productReadListResponse.data.count)
        }
    }, [productReadListResponse?.data?.count])

    useEffect(() => {
        if (!productReadListResponse?.data?.rows) return

        const rows = productReadListResponse.data.rows;
        if (rows.length) {
            if (page === 0) {
                setData(prev => [...prev, ...rows.filter(x => !prev.some(y => y.product_id === x.product_id))])
            } else {
                setData(rows)
            }
            setHasMore(true)
        } else {
            setHasMore(false)
        }
    }, [productReadListResponse?.data?.rows, page])

    if (productReadListError) {
        return (
            <View>
                <Text>{JSON.stringify(productReadListError)}</Text>
                <Button title="Reload" onPress={() => { productReadListRefetch() }} />
            </View>
        );
    }
    if (userReadListError) {
        return (
            <View>
                <Text>{JSON.stringify(userReadListError)}</Text>
                <Button title="Reload" onPress={() => { userReadListRefetch() }} />
            </View>
        );
    }
    if (listReadListError) {
        return (
            <View>
                <Text>{JSON.stringify(listReadListError)}</Text>
                <Button title="Reload" onPress={() => { listReadListRefetch() }} />
            </View>
        );
    }
    if (
        !userReadListResponse ||
        !listReadListResponse
    ) return <Text>...loading...</Text>
    return (

        <SafeAreaView style={styles.container}>
            <View style={[styles.flex, styles.header]}>
                <View style={styles.flex}>
                    <FormInput
                        value={searchTerm}
                        label=''
                        onChangeText={e => setSearchTerm(e)}
                        // left={
                        //     <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                        // }
                    />
                </View>
            </View>

            <SwipeListView
                data={data}
                renderItem={({ item }) => <Item {...item} />}
                keyExtractor={item => item.product_id.toString()}
                refreshing={isRefreshing}
                onRefresh={() => {
                    setLimit(prev => prev + 1)
                    setPage(0)

                }}
                onEndReached={() => {
                    if (!isLoading && !isFetching && hasMore) {
                        setPage(prev => prev + 1)
                    }
                }}
                onEndReachedThreshold={10}
                renderHiddenItem={(data, rowMap) => <HiddenItem data={data} rowMap={rowMap} setData={setData} userReadListResponse={userReadListResponse} listReadListResponse={listReadListResponse} />}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
            />
            {
                (isRefreshing) && (
                    <ActivityIndicator size="large" />
                )
            }
        </SafeAreaView>
    )

}

interface IHiddenItem {
    data: ListRenderItemInfo<IProductRead>;
    rowMap: RowMap<IProductRead>;
    setData: React.Dispatch<React.SetStateAction<IProductRead[]>>;
    listReadListResponse: IListReadListResponse;
    userReadListResponse: IUserReadListResponse;
}
const HiddenItem: React.FC<IHiddenItem> = ({ data, rowMap, setData, userReadListResponse, listReadListResponse }) => {
    const [showSendUser, setShowSendUser] = useState(false)
    const [showListUser, setShowListUser] = useState(false)


    const [deleteProduct] = useDeleteProductDeleteMutation()
    const deleteRow = async (rowMap: RowMap<IProductRead>, rowKey: number) => {
        await deleteProduct({
            product_id: rowKey
        })
        setData(prev => prev.filter(x => x.product_id !== rowKey))
    };
    return (
        <>
            <View style={styles.rowBack} >
                <TouchableOpacity
                    style={{ width: 75 }}

                    onPress={() => setShowSendUser(true)}>
                    <Text >Ürünü Gönder</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={() => setShowListUser(true)}>
                    <Text style={styles.backTextWhite}>liste değiştir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={() => deleteRow(rowMap, data.item.product_id)}>
                    <Text style={styles.backTextWhite}>sil</Text>
                </TouchableOpacity>
            </View >

            <SendToUser
                setVisible={setShowSendUser}
                visible={showSendUser}
                rowMap={rowMap}
                productId={data.item.product_id}
                userReadListResponse={userReadListResponse}
            />
            <SendToList
                setVisible={setShowListUser}
                visible={showListUser}
                rowMap={rowMap}
                productId={data.item.product_id}
                listReadListResponse={listReadListResponse}
            />

        </>
    )
}

interface ISendToContainer {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    visible: boolean;
    rowMap: RowMap<IProductRead>;
    productId: number;
}
const SendToUser: React.FC<ISendToContainer & { userReadListResponse: IUserReadListResponse }> = ({ visible, setVisible, userReadListResponse, productId }) => {
    const { asyncHandler } = useAsyncHandler()
    const [userId, setUserId] = useState<number>()
    const [sendToUser] = usePostProductSendToUserMutation()
    const handleSend = () => {
        if (!userId) {
            Alert.alert("kullanıcı seçilmedi")
            return
        }
        asyncHandler(async () => {
            await sendToUser({
                product_id: productId,
                user_id: userId,
            }).unwrap()
            setVisible(false)
        })

    }
    return (
        <ModalContent isVisible={visible} onClose={() => setVisible(false)} >
            <View style={{ gap: 20, flex: 1, margin: 20 }} >
                <Select
                    data={(userReadListResponse.data?.rows ?? []).map((user) => {
                        return {
                            label: user.name,
                            value: user.user_id
                        }
                    })}
                    labelField='label'
                    onChange={(e) => setUserId(e.value)}
                    valueField='value'
                />
                <Button onPress={handleSend} title='Gönder' />
            </View>
        </ModalContent>
    )
}

const SendToList: React.FC<ISendToContainer & { listReadListResponse: IListReadListResponse }> = ({ visible, setVisible, listReadListResponse,productId }) => {
    const { asyncHandler } = useAsyncHandler()
    const [listId, setListId] = useState<number>()
    const [sendToList] = usePostProductSendToListMutation()
    const handleSend = () => {
        if (!listId) {
            Alert.alert("kullanıcı seçilmedi")
            return
        }
        asyncHandler(async () => {
            await sendToList({
                product_id: productId,
                list_id: listId,
            }).unwrap()
            setVisible(false)
        })

    }
    return (
        <ModalContent isVisible={visible} onClose={() => setVisible(false)} >
            <View style={{ gap: 20, flex: 1, margin: 20 }} >
                <Select
                    data={(listReadListResponse.data?.rows ?? []).map(list => ({
                        label: list.name,
                        value: list.list_id
                    }))}
                    labelField='label'
                    onChange={(e) => setListId(e.value)}
                    valueField='value'

                />
                <Button onPress={handleSend} title='Gönder' />
            </View>
        </ModalContent>
    )
}
interface ItemProps extends IProductRead {
}
const Item = ({ name, Images, barcode, length, width }: ItemProps) => (
    <>
        <TouchableHighlight
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View style={styles.rowItem}>
                <Swiper style={styles.wrapper} showsButtons={true}>
                    {
                        Images.length ?
                            Images.map(image => (
                                <View key={image.image_id} style={styles.slide1}>
                                    <Image style={{ width: 100, height: 100 }} src={`${API_URL}/image/${image.url.replaceAll('\\', '/')}`} />
                                </View>
                            )) :
                            <View style={styles.slide1}>
                                <Image style={{ width: 100, height: 100 }} src={`${API_URL}/image/uploads/noImage.png`} />
                            </View>
                    }
                </Swiper>

                <Text style={styles.colItem}>ürün adı: {name}</Text>
                <Text style={styles.colItem}>barkod: {barcode}</Text>
                <Text style={styles.colItem}>uzunluk: {length}</Text>
                <Text style={styles.colItem}>genişlik: {width}</Text>
            </View>
        </TouchableHighlight>

    </>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    flex: {
        gap: 10,
        flexDirection: 'row'
    },
    header: {
        height: 70,
        width: '100%',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowFront: {
        // alignItems: 'center',
        backgroundColor: '#FFF',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        // height: 50,
    },
    backTextWhite: {
        color: '#FFF',
        textAlign: 'center'
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: '#137d87',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: '#eb5234',
        right: 0,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    rowItem: {
        flex: 1,
    },
    colItem: {
        fontSize: 20,
    },
    wrapper: {
        height: 120
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});