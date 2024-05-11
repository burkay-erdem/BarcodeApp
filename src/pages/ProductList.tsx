
import React from 'react'
import { useGetProductReadListQuery } from '../service/product.service'
import { ActivityIndicator, List, MD2Colors, MD3Colors } from 'react-native-paper';
import { View } from 'react-native';

export const ProductList = () => {
    const { data: productReadListResponse, isLoading, isError } = useGetProductReadListQuery({})
    const handleClick = () => {
    }
    if (isLoading) {
        return (
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
        )
    }
    return (
        <View style={{
            flex: 1,
        }}>

            <List.Section>
                <List.Subheader>Some title</List.Subheader>
                <List.Item title="First Item" left={() => <List.Icon icon="folder" />} />
                <List.Item
                    title="Second Item"
                    left={() => <List.Icon color={MD3Colors.tertiary70} icon="folder" />}
                />
            </List.Section>
        </View>
    )
}
