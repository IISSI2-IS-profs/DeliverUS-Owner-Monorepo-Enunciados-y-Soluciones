/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, ImageBackground, Image, Pressable } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getDetail } from '../../api/RestaurantEndpoints'
import { remove, promote } from '../../api/ProductEndpoints'
import ImageCard from '../../components/ImageCard'
import TextRegular from '../../components/TextRegular'
import TextSemiBold from '../../components/TextSemibold'
import * as GlobalStyles from '../../styles/GlobalStyles'
import DeleteModal from '../../components/DeleteModal'
import defaultProductImage from '../../../assets/product.jpeg'

export default function RestaurantDetailScreen({ navigation, route }) {
  const [restaurant, setRestaurant] = useState({})
  const [productToBeDeleted, setProductToBeDeleted] = useState(null)

  useEffect(() => {
    fetchRestaurantDetail()
  }, [route])

  const renderHeader = () => {
    return (
      <View>
        <ImageBackground source={(restaurant?.heroImage) ? { uri: process.env.API_BASE_URL + '/' + restaurant.heroImage, cache: 'force-cache' } : undefined} style={styles.imageBackground}>
          <View style={styles.restaurantHeaderContainer}>
            <TextSemiBold textStyle={styles.textTitle}>{restaurant.name}</TextSemiBold>
            <Image style={styles.image} source={restaurant.logo ? { uri: process.env.API_BASE_URL + '/' + restaurant.logo, cache: 'force-cache' } : undefined} />
            <TextRegular textStyle={styles.description}>{restaurant.description}</TextRegular>
            <TextRegular textStyle={styles.description}>{restaurant.restaurantCategory ? restaurant.restaurantCategory.name : ''}</TextRegular>
          </View>
        </ImageBackground>

        <Pressable
          onPress={() => navigation.navigate('CreateProductScreen', { id: restaurant.id })
          }
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? GlobalStyles.brandGreenTap
                : GlobalStyles.brandGreen
            },
            styles.button
          ]}>
          <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
            <MaterialCommunityIcons name='plus-circle' color={'white'} size={20} />
            <TextRegular textStyle={styles.text}>
              Create product
            </TextRegular>
          </View>
        </Pressable>
      </View>
    )
  }

  // BEGIN SOLUTION
  const renderCardTitle = (item) => {
    return (<>
      <TextSemiBold style={{ fontSize: 15 }}>{item.name}</TextSemiBold>
      {restaurant.discountPercentage > 0 && item.promoted && <TextSemiBold style={{ marginLeft: 5, fontSize: 15, color: GlobalStyles.brandPrimary }}>({restaurant.discountPercentage}% off)</TextSemiBold>}
    </>)
  }
  // END SOLUTION

  const renderProduct = ({ item }) => {
    return (
      <ImageCard
        imageUri={item.image ? { uri: process.env.API_BASE_URL + '/' + item.image } : defaultProductImage}
        //BEGIN SOLUTION
        title={renderCardTitle(item)}
      //END SOLUTION
      >
        <TextRegular numberOfLines={2}>{item.description}</TextRegular>
        {/* BEGIN SOLUTION */}
        {/* Shows de promoted price */}
        <View flexDirection='row'>
          <TextSemiBold textStyle={styles.price}>{item.price.toFixed(2)}€
            {restaurant.discountPercentage > 0 && item.promoted && <TextSemiBold style={styles.pricePromoted}>{"Price promoted: " + (item.price * (1 - restaurant.discountPercentage / 100)).toFixed(2)}€</TextSemiBold>}
          </TextSemiBold>
        </View>
        {/* END SOLUTION */}
        {
          !item.availability &&
          <TextRegular textStyle={styles.availability}>Not available</TextRegular>
        }
        <View style={styles.actionButtonsContainer}>
          {/* BEGIN SOLUTION 
            In case the discount percentage associated with the restaurant is greater than 0, 
            a button is displayed allowing to promote or demote the product. 
            Otherwise, button won't be displayed.
          */

            restaurant.discountPercentage > 0 &&
            <Pressable
              onPress={() => { promoteProduct(item) }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? GlobalStyles.brandSuccessTap
                    : GlobalStyles.brandSuccess
                },
                styles.actionButton
              ]}>
              <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                <MaterialCommunityIcons name={item.promoted ? 'star' : 'star-outline'} color={'white'} size={20} />
                <TextRegular textStyle={styles.text}>
                  {item.promoted && "Demote"}
                  {!item.promoted && "Promote"}
                </TextRegular>
              </View>
            </Pressable>
          /* END SOLUTION */}
          <Pressable
            onPress={() => navigation.navigate('EditProductScreen', { id: item.id })
            }
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? GlobalStyles.brandBlueTap
                  : GlobalStyles.brandBlue
              },
              styles.actionButton
            ]}>
            <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
              <MaterialCommunityIcons name='pencil' color={'white'} size={20} />
              <TextRegular textStyle={styles.text}>
                Edit
              </TextRegular>
            </View>
          </Pressable>

          <Pressable
            onPress={() => { setProductToBeDeleted(item) }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? GlobalStyles.brandPrimaryTap
                  : GlobalStyles.brandPrimary
              },
              styles.actionButton
            ]}>
            <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
              <MaterialCommunityIcons name='delete' color={'white'} size={20} />
              <TextRegular textStyle={styles.text}>
                Delete
              </TextRegular>
            </View>
          </Pressable>
        </View>
      </ImageCard >
    )
  }

  const renderEmptyProductsList = () => {
    return (
      <TextRegular textStyle={styles.emptyList}>
        This restaurant has no products yet.
      </TextRegular>
    )
  }

  const fetchRestaurantDetail = async () => {
    try {
      const fetchedRestaurant = await getDetail(route.params.id)
      setRestaurant(fetchedRestaurant)
    } catch (error) {
      showMessage({
        message: `There was an error while retrieving restaurant details (id ${route.params.id}). ${error}`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  const removeProduct = async (product) => {
    try {
      await remove(product.id)
      await fetchRestaurantDetail()
      setProductToBeDeleted(null)
      showMessage({
        message: `Product ${product.name} succesfully removed`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    } catch (error) {
      console.log(error)
      setProductToBeDeleted(null)
      showMessage({
        message: `Product ${product.name} could not be removed.`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  // BEGIN SOLUTION
  // Promotes or demotes a product calling to proper endpoint on the REST API.
  const promoteProduct = async (product) => {
    try {
      await promote(product.id)
      await fetchRestaurantDetail()
      // Optional
      showMessage({
        message: `Product ${product.name} succesfully promoted`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    } catch (error) {
      console.log(error)
      // Optional
      showMessage({
        message: `Product ${product.name} could not be promoted.`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }
  // END SOLUTION

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyProductsList}
        style={styles.container}
        data={restaurant.products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
      />
      <DeleteModal
        isVisible={productToBeDeleted !== null}
        onCancel={() => setProductToBeDeleted(null)}
        onConfirm={() => removeProduct(productToBeDeleted)}>
        <TextRegular>If the product belong to some order, it cannot be deleted.</TextRegular>
      </DeleteModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: GlobalStyles.brandSecondary
  },
  restaurantHeaderContainer: {
    height: 250,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100,
    margin: 10
  },
  description: {
    color: 'white'
  },
  textTitle: {
    fontSize: 20,
    color: 'white'
  },
  emptyList: {
    textAlign: 'center',
    padding: 50
  },
  button: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    width: '80%'
  },
  text: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginLeft: 5
  },
  availability: {
    textAlign: 'right',
    marginRight: 5,
    color: GlobalStyles.brandSecondary
  },
  actionButton: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    margin: '1%',
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    width: '33%'
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    bottom: 5,
    position: 'absolute',
    width: '90%'
  },
  // BEGIN SOLUTION
  badge: {
    textAlign: 'center',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  pricePromoted: {
    marginLeft: 10,
    color: GlobalStyles.brandPrimary,
  }
  // END SOLUTION
})
