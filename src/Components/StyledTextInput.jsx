import React from 'react'
import {TextInput, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    textInput:{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#999',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 5,
        marginBottom: 5,
        width: 500,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    error:{
        borderColor: 'red'
    }
})

const StyledTextInput = ({ style={}, error, ...props})=>{
    const inputStyle=[
        styles.textInput,
        style,
        error && styles.error
    ]

    return <TextInput style={inputStyle} {...props} />
}

export default StyledTextInput