## Introduction
This repository includes the complete backend (folder `DeliverUS-Backend`) and the owner frontend (folder `DeliverUS-Frontend-Owner`). It will serve as the basis for the exams of the course.

## Preparation of the environment

Windows:
* Open a terminal and run the command `npm run install:all:win`.

Linux/MacOS:
* Open a terminal and run the command `npm run install:all:bash`.

## Running and debugging

* To **run the backend**, open a terminal and run the command `npm run start:backend`. 

* To **run the frontend**, open a new terminal and run the `npm run start:frontend` command. 

* To **debug the backend**, make sure there is **NOT** a running instance, click on the `Run and Debug` button in the sidebar, select `Debug Backend` from the drop-down list, and click the `Play` button. 

* To **debug the frontend**, make sure **EXISTS** a running instance, click on the `Run and Debug` button in the sidebar, select `Debug Frontend` from the drop-down list, and click the *Play* button. 

# Statement

The company has decided to offer owners the possibility to associate a discount (integer between 0 and 100, e.g. 10) to their restaurants, so that the system will then display and apply the specified discount to their products. Owners will be able to set a different discount percentage for each of their restaurants, which would then be applied to each restaurant's products.

However, some owners have indicated that not all products in their catalogues are regularly promoted. Therefore, the company has decided, in addition to allowing the restaurant to indicate the percentage discount on the original price, to give the possibility to indicate on each product whether it will be promoted or not.

All promoted products of a restaurant will be promoted with the same percentage discount that the owner indicates in the properties of his restaurants. Please note that a product can be promoted but if the discount percentage indicated in the restaurant is 0%, it will have no effect. Only the owners of a restaurant will be able to activate and deactivate the promoted products as well as indicate the promotional discount.

By default, restaurants will not have any discount percentage (i.e. the discount percentage will be 0).

Remember to validate in the backend that, when promoting/de-promoting a product, the associated restaurant has a discount percentage higher than 0. Otherwise, it cannot be promoted.

Therefore, the editing and creation views of the restaurants must incorporate a new field in the form (`InputItem`) to change the discount percentage, allowing the owner to adjust the value of the property. Remember to validate in frontend (and backend) that the value of this new field is compatible with the data type and constraints mentioned above.

In order for the owner to be able to determine to which products the restaurant discount applies, modify the restaurant's detail view, where the list of its products is displayed, to include a button that allows the owner to activate or deactivate the promotion for that product. In case the restaurant does not have a discount greater than 0, this button will not be displayed.

The product creation and editing views will not include the option to apply or not to apply the discount.

The system should display the restaurants with the discount applied and the option to promote or de-promote them as shown in the screenshot below:

<img width="395" alt="Image2" src="https://github.com/IISSI2-IS-profs/DeliverUS-Owner-Monorepo/blob/RestaurantDiscountCode-Solution/screenshot%201.png">


As an illustrative example, a restaurant owner could apply a 10% discount to restaurant1, and a further 20% discount to restaurant2.

<img width="395" alt="Image3" src="https://github.com/IISSI2-IS-profs/DeliverUS-Owner-Monorepo/blob/ProductDiscountCode-Solution/screenshot%203.png">

Remember that:

1. The discount is in the interval [0,100].
2. If a restaurant activates the promotional discount, the products may or may not be promoted.

Implement the necessary changes in Backend and Frontend to include this functionality.