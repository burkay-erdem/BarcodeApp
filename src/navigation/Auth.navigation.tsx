import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import React, { useCallback } from 'react'
import { ProductList } from '../page/ProductList';
import UserSave from '../page/UserSave';
import ProductSave from '../page/ProductSave';
import { Logout } from '../page/Logout';
import { useAppSelector } from '../hook/useContextProvider';
import { Session } from '../../types/response/user.interface';
import { RoleTypes } from '../../types/model/role.interface';
import { StyleSheet, Text } from 'react-native';

const Drawer = createDrawerNavigator();
interface IAuthNavigation {
    session: Session
}
export const AuthNavigation: React.FC<IAuthNavigation> = ({ session }) => {


    if (session.role.name === RoleTypes.Accounting) {
        return (
            <Drawer.Navigator
                drawerContent={(props) => {
                    return (
                        <DrawerContentScrollView {...props}>
                            <Text style={styles.title}>{session.name} - ({session.role.name})</Text>
                            <DrawerItemList {...props} />
                        </DrawerContentScrollView>
                    )
                }}
            >
                <Drawer.Screen name="Listeler " component={ProductList} />
                <Drawer.Screen name="Ürün Girişi" component={ProductSave} />
                <Drawer.Screen name="Çıkış" component={Logout} />
            </Drawer.Navigator>
        )
    }
    if (session.role.name === RoleTypes.Operator) {
        return (
            <Drawer.Navigator
                drawerContent={(props) => {
                    return <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                    </DrawerContentScrollView>
                }}
            >
                <Drawer.Screen name="Gelen ürünler " component={ProductList} />
                <Drawer.Screen name="Çıkış" component={Logout} />
            </Drawer.Navigator>
        )
    }
    if (session.role.name === RoleTypes.Supplier) {
        return (
            <Drawer.Navigator
                drawerContent={(props) => {
                    return <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                    </DrawerContentScrollView>
                }}
            >
                <Drawer.Screen name="Ürünlerim " component={ProductList} />
                <Drawer.Screen name="Çıkış" component={Logout} />
            </Drawer.Navigator>
        )
    }


    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Çıkış" component={Logout} />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    title: {
        padding: 10,
        fontSize: 20,
        fontWeight: '500',
        borderBottomWidth: 0.2,
        textTransform: 'capitalize',

    }
})