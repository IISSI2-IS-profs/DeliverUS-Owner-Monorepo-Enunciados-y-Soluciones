# IISSI2: Individual laboratory evaluation 2022-2023

## Environment Setup

Windows:

* Open a terminal and run the command `npm run install:all:win`.

Linux/MacOS:

* Open a terminal and run the command `npm run install:all:bash`.

## Execution and Debugging

* To **run the backend**, open a terminal and run the command `npm run start:backend`.

* To **run the frontend**, open a new terminal and run the command `npm run start:frontend`.

* To **debug the backend**, make sure there is **NO** running instance, click the `Run and Debug` button in the sidebar, select `Debug Backend` from the dropdown list, and press the *Play* button.

* To **debug the frontend**, make sure there is a running instance, click the `Run and Debug` button in the sidebar, select `Debug Frontend` from the dropdown list, and press the *Play* button.

## Statement - Restaurant Discount codes

Make the modifications you consider necessary, both in the backend and in the frontend, to satisfy the new requirements described below.

The company has decided to offer owners the possibility of associating a discount code (e.g: SALES20) to their restaurants, so that the system can later display and apply the specified discount promotion code. As an illustrative example, a restaurant owner could apply the SPRING code associated with a 10% discount to *Casa Felix*, and another discount code, e.g. EXTREME, associated with a 30% discount to another restaurant.

The system should show the restaurants with the registered discount when both the discount code and the discount value have a value, as shown in the following screenshot:

<img height="600" alt="Aspect of the resulting screen" src="screenshot.png">

Remember that:

1. The maximum number of characters of a discount code is 10.
1. The discount is in the range [1, 99].
1. The discount code cannot be repeated for restaurants owned by the same owner.

## Procedure for submission

1. Delete the node_modules folders from the backend and frontend projects and the .expo folder from the frontend project.
1. Create a zip that includes both projects. **PLEASE NOTE: Check that the resulting zip file is not the same as the one you downloaded and therefore includes your solutions**
1. Notify your teacher before submitting.
1. When you have the approval of your teacher, send the resulting file through the e-learning platform Enseñanza Virtual.
