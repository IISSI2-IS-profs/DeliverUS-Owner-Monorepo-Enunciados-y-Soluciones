# DeliverUS-Owner Monorepo

## Introduction

This repository includes the complete backend (folder `DeliverUS-Backend`) and the owner frontend (folder `DeliverUS-Frontend-Owner`). It will serve as the basis for the exam.

## Environment Setup

Windows:

* Open a terminal and run the command `npm run install:all:win`.

Linux/MacOS:

* Open a terminal and run the command `npm run install:all:bash`.

## Execution and Debugging

* To **run the backend**, open a terminal and execute the command `npm run start:backend`.

* To **run the frontend**, open a new terminal and execute the command `npm run start:frontend`.

* To **debug the backend**, ensure that there is **NO** running instance, click the `Run and Debug` button on the sidebar, select `Debug Backend` from the dropdown list, and hit the *Play* button.

* To **debug the frontend**, ensure that there is an **EXISTING** running instance, click the `Run and Debug` button on the sidebar, select `Debug Frontend` from the dropdown list, and hit the *Play* button.

* To **redo the migrations and seeders of the backend**, open a terminal and run the command `npm run migrate:backend`.

## Statement

The company has decided to offer owners the possibility of manually making the status of their open restaurants be `online` or `offline`. In case a restaurant has a status `online` or `offline`, the new functionality would provide a button to toggle between both status. Otherwise, such button must be unavailable.

Take into account that any new restaurant is initially stored as `offline` by default. Only offline restaurants may be online and viceversa. On the other hand, if a restaurant reaches a status of `closed` or `temporaly closed`, no possibility of manual change will be available and its use will therefore be forbidden by the system. Moreover, note that a restaurant could not either be able to change its status if it has orders with a null `deliveredAt` value.

The new functionality will also involve providing the list of owned restaurants ordered by status (ascendently) and for the same status, by name. Finally, the status of every restaurant must be visible (see images below).

The system should show the list of restaurants by owner as shown in the following screenshots:

<img alt="Image1" src="assets/image1.png">

<img alt="Image2" src="assets/image2.png">

<img alt="Image2" src="assets/image3.png">

We ask you to implement the necessary changes in Backend and Frontend to include such functionality.
