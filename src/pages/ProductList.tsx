
import React, { useCallback, useEffect, useState } from 'react'
import { useGetProductReadListQuery } from '../service/product.service'
import { ActivityIndicator, DataTable, List, MD2Colors, MD3Colors } from 'react-native-paper';
import { Text, View } from 'react-native';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';
import { API_URL } from '@env';
import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

export const ProductList = () => {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(6);
    const [total, setTotal] = useState(1);
    const { data: productReadListResponse, isLoading, isError, error, isSuccess } = useGetProductReadListQuery({
        limit,
        page
    })
    useEffect(() => {
        if (productReadListResponse?.data?.count) {
            setTotal(productReadListResponse.data.count)
        }
    }, [productReadListResponse?.data?.rows])


    React.useEffect(() => {
        setPage(0);
    }, [limit]);

    const handleClick = () => { }

    if (isLoading) {
        return (
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
        )
    }
    if (isError) {
        return <Text>{JSON.stringify(error)}</Text>;
    }

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Resim</DataTable.Title>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Barcode</DataTable.Title>
            </DataTable.Header>

            {(productReadListResponse?.data?.rows ?? []).map((product) => (
                <DataTable.Row key={product.product_id}>
                    <DataTable.Cell>
                        <View style={{
                            flexDirection: 'row'
                        }}>

                            {product.Images.length ? (
                                product.Images.map(image => (
                                    <Image key={image.image_id} size={24} style={{}} source={{ uri: `${API_URL}/image/${image.url}` }} />
                                ))
                            ) : (
                                <Image size={24} source={{ uri: `${API_URL}/image/uploads/noImage.png` }} />
                            )}
                        </View>

                    </DataTable.Cell>
                    <DataTable.Cell>
                        {product.name}
                    </DataTable.Cell>
                    <DataTable.Cell >
                        {product.barcode}
                    </DataTable.Cell>
                </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(total / limit)}
                onPageChange={(_page) => { setPage(_page) }}
                label={`${limit * page}-${limit * (page + 1)} of ${total}`}
                numberOfItemsPerPageList={[4, 8, 10]}
                numberOfItemsPerPage={limit}
                onItemsPerPageChange={(_limit) => setLimit(_limit)}
                showFastPaginationControls
                selectPageDropdownLabel={'Rows per page'}
            />
        </DataTable>
    )

}
