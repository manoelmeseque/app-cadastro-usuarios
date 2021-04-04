import React, { useContext, useState } from 'react'
import {View, Text, TextInput, StyleSheet, Button} from 'react-native'
import UsersContext from '../context/UsersContext'


export default ({route, navigation}) => {
    const [user, setUser ] = useState(route.params ? route.params:{})
    const {dispatch} = useContext(UsersContext)
    return(
        <View style={styles.form}>
            <Text>Nome</Text>
            <TextInput
                style={styles.input} 
                onChangeText={name => setUser({...user, name})}
                placeholder="Informe o nome"
                value={user.name}
            />

            <Text>E-mail</Text>
            <TextInput 
                style={styles.input}
                onChangeText={email => setUser({...user, email})}
                placeholder="Informe o email"
                value={user.email}
            />

            <Text>AvatarUrl</Text>
            <TextInput
                style={styles.input} 
                onChangeText={avatarUrl => setUser({...user, avatarUrl})}
                placeholder="Informe o Avatar Url"
                value={user.avatarUrl}
            />
            <Button title="Salvar" onPress={() => {
                dispatch({
                    type: user.id ? 'updateUser' : 'createUser',
                    payload: user
                })
                navigation.goBack()
            
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    form:{
        padding: 20,
    },
    input:{
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        padding: 10

    }
})