
import React, { useEffect, useMemo, useState } from 'react'
import { useDeleteProductDeleteMutation, useGetProductReadListQuery } from '../service/product.service'
import { ActivityIndicator, Button, Image, ListRenderItemInfo, SafeAreaView, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import { IProductRead } from '../../types/response/product.interface';
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';
import { API_URL } from '@env';
import Swiper from 'react-native-swiper';
import { FormInput } from '../components/FormInput';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export const ProductList = () => {
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(1);
    const [limit, setLimit] = useState(5);
    const [hasMore, setHasMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState("")
    const [data, setData] = useState<IProductRead[]>([]);

    const { data: productReadListResponse, refetch, isError, error, isLoading, isFetching, currentData } = useGetProductReadListQuery({
        limit,
        page
    })
    useEffect(() => {
        console.log('productReadListResponse: ', productReadListResponse);
    }, [productReadListResponse])
    useEffect(() => {
        console.log('currentData: ', currentData);
    }, [currentData])


    const isRefreshing = useMemo(() => {
        return isLoading || isFetching
    }, [isLoading, isFetching])
    useEffect(() => {
        if (productReadListResponse?.data?.count) {
            setTotal(productReadListResponse.data.count)
        }
    }, [productReadListResponse?.data?.count])
    useEffect(() => {
        const rows = productReadListResponse?.data?.rows;
        if (rows?.length) {
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




    if (isError) {
        return (
            <View>
                <Text>{JSON.stringify(error)}</Text>
                <Button title="Reload" onPress={() => { refetch() }} />
            </View>
        );
    }
    return (

        <SafeAreaView style={styles.container}>
            <View style={[styles.flex, styles.header]}>
                <View style={styles.flex}>
                    <FormInput
                        value={searchTerm}
                        label=''
                        onChangeText={e => setSearchTerm(e)}
                        left={
                            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                        }
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
                renderHiddenItem={(data, rowMap) => <HiddenItem data={data} rowMap={rowMap} setData={setData} />}
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

}
const HiddenItem: React.FC<IHiddenItem> = ({ data, rowMap, setData }) => {

    const closeRow = (rowMap: RowMap<IProductRead>, rowKey: number) => {
        console.log('rowKey closeRow: ', rowKey);
    };

    const [deleteProduct] = useDeleteProductDeleteMutation()
    const deleteRow = async (rowMap: RowMap<IProductRead>, rowKey: number) => {
        const deleteProductResponse = await deleteProduct({
            product_id: rowKey
        })
        setData(prev => prev.filter(x => x.product_id !== rowKey))
    };
    return (
        <View style={styles.rowBack} >
            <TouchableOpacity
                style={[styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.product_id)}>
                <Text style={styles.backTextWhite}>Ürünü Gönder</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.product_id)}>
                <Text style={styles.backTextWhite}>liste değiştir</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.product_id)}>
                <Text style={styles.backTextWhite}>sil</Text>
            </TouchableOpacity>
        </View >
    )
}

interface ItemProps extends IProductRead { }
const Item = ({ name, Images, barcode, length, width }: ItemProps) => (
    <TouchableHighlight
        onPress={() => console.log('You touched me')}
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