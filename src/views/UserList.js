import React, { useContext } from 'react'
import {View, FlatList, Alert } from 'react-native'
import { ListItem, Avatar, Button, Icon } from 'react-native-elements'
import UsersContext from '../context/UsersContext'

export default props => {
    
    const { state, dispatch } = useContext(UsersContext)

    function getAction(user){
        return (
        <>
            <Button onPress={() => props.navigation.navigate('UserForm', user)} />
        </>
        )
    
    }

    function confirmDeleteUser(user){
        Alert.alert('Excluir Usuário', 'deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress(){
                    dispatch({
                        type: 'deleteUser',
                        payload: user
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getUserItem({ item: user }){
        return (
            <ListItem 
                key={user.id} 
                title={user.name} 
                bottomDivider
                onPress={() => props.navigation.navigate('UserForm')}
                rightElement={getAction(user)}
                >
                <Avatar source={{uri: user.avatarUrl}} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <>
                    <Button 
                        onPress={() => props.navigation.navigate('UserForm', user)}
                        type="clear"
                        icon={<Icon name="edit" size={22} color="orange" />}
                    />
                    <Button 
                        onPress={() => confirmDeleteUser(user)}
                        type="clear"
                        icon={<Icon name="delete" size={22} color="red" />}
                    />
                </>
            </ListItem>
        )
    }

    return(
        <View>
            <FlatList
                data={state.users}
                keyExtractor={user => user.id}
                renderItem={getUserItem}
            />
        </View>
    )
}