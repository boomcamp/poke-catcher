# Project Summary

---

The goal of this project is to practice using javascript promises while making
http requests, third-party API's and manipulating the DOM to build rich user
interactions.

To practice these skills you'll be building a small interactive game where a
user can explore the Pokemon world and catch Pokemon they find along the way.

## Getting Started

- This app should run using the live server extension in vscode. In order to prevent some errors.

## Resources

### API

To assist with building this game you need to utilize
[pokeapi](https://pokeapi.co/). This is a free third-party API containing all of
the information we need to create our Pokemon game world.

You can find all of the documentation for the API at the link below, but the
requirements will also guide you to helpful API resources.

https://pokeapi.co/

### Fetch

Please use the **fetch** browser API to make your HTTP requests.

Documentation:
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

## Game Premise

This game is going to be very simple. The user will be able to select a
**Region**, **Location**, and **Area** they want to explore for Pokemon.

Once a user has selected the those three things, they should then be able to
click a button to **Explore** the selected **Area** for Pokemon.

Every **Area** has list of possible Pokemon that can be encountered there. A
random Pokemon from the currently selected area should be presented to the user
as an **Encounter**.

When a Pokemon is Encountered the following details should be shown to the user:

Pokemon:

- Name
- Image
- Stats

There should then be another button that allows the user to **Catch** the
encountered Pokemon.

When a Pokemon is caught, they should be added to a visible list of captured
Pokemon for the user.

## Requirements

When a user initially navigates to the PokeCatcher game page they should be able
to select a **Region** they would like to explore.

> Hint:
>
> You can get a list of regions in the Pokemon universe by utilizing the pokeapi
> endpoint:
>
> https://pokeapi.co/api/v2/region

After a **Region** has been selected the user should then be able to select a
**Location** within that region.

> Hint:
>
> You can get a list of locations within a region by querying a regions's
> details and then inspecting the "locations" property of the returned region
> data.
>
> Query region details: https://pokeapi.co/api/v2/region/{regionName}

After a **Location** has been selected a user should then be able to select an
**Area** within that location.

> Hint:
>
> You can get a list of areas within a location by querying a location's details
> and then inspecting the "areas" property of the returned data.
>
> Query location details: https://pokeapi.co/api/v2/location/{locationName}

Now that a **Region**, **Location** and **Area** have been selected the user
should be able to press a button to "Explore" the area. When a user "Explores"
an area a possible Pokemon encounter needs to be selected. Every **Area** has a
list of possible Pokemon that can be encountered there. A Pokemon should then be
randomly selected from that encounter list and displayed to the user.

> Hint:
>
> To get the possible Pokemon encounters you'll need to query the area's
> details.
>
> Query area details: https://pokeapi.co/api/v2/location-area/{areaName}

When a random Pokemon from the area has been selected for an encounter details
for that Pokemon should be shown to the user. Users should see an image of the
Pokemon being encountered, the name of the Pokemon, as well as the base stats of
the encountered Pokemon.

> Hint: You can get details for a Pokemon by querying the api and inspecting the
> returned data.
>
> Query Pokemon details: https://pokeapi.co/api/v2/pokemon/{pokemonName}

A user should then have a way to **Catch** a Pokemon. When a Pokemon is caught
they should be added to an area of the UI where the user can see all of the
Pokemon that they have caught. Users should never be able to have more than 6
caught Pokemon at once.

When a Pokemon is caught, the encounter should be cleared and the user told to
explore for more Pokemon.

## Finished

If you have time, you can add any other features you think would be interesting
or make the user experience better.

Create a pull request back to this repository with your submission.
