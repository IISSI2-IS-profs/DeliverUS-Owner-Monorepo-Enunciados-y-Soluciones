// SOLUCION
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'
import { createCategory } from '../../api/RestaurantEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'
import TextError from '../../components/TextError'
import { Formik } from 'formik'

export default function CreateRestaurantCategoryScreen ({ navigation }) {
  const [backendErrors, setBackendErrors] = useState()

  const initialRestaurantCategoryValues = { name: null }
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(50, 'Name too long, max. 50 chars.')
      .required('Name is required')
  })

  const createRestaurantCategory = async (values) => {
    setBackendErrors([])
    try {
      console.log(values)
      const createdRestaurantCategory = await createCategory(values)
      showMessage({
        message: `Restaurant category ${createdRestaurantCategory.name} succesfully created`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.navigate('CreateRestaurantScreen', { dirty: true })
    } catch (error) {
      console.log(error)
      setBackendErrors(error.errors)
    }
  }
  return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialRestaurantCategoryValues}
            onSubmit={createRestaurantCategory}>
            {({ handleSubmit, setFieldValue, values }) => (
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ width: '60%' }}>
                            <InputItem
                                name='name'
                                label='Name:'
                            />

                            {backendErrors &&
                                backendErrors.map((error, index) => <TextError key={index}>{error.param}-{error.msg}</TextError>)
                            }

                            <Pressable
                                onPress={handleSubmit}
                                style={({ pressed }) => [
                                  {
                                    backgroundColor: pressed
                                      ? GlobalStyles.brandSuccessTap
                                      : GlobalStyles.brandSuccess
                                  },
                                  styles.button
                                ]}>
                                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                                    <MaterialCommunityIcons name='content-save' color={'white'} size={20} />
                                    <TextRegular textStyle={styles.text}>
                                        Save
                                    </TextRegular>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            )}
        </Formik>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  }
})
