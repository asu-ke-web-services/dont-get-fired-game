Sustainability Game
===================

[![Build Status](https://travis-ci.org/gios-asu/dont-get-fired-game.svg?branch=master)](https://travis-ci.org/gios-asu/dont-get-fired-game)
[![Coverage Status](https://coveralls.io/repos/gios-asu/sustainability-game/badge.svg?branch=develop&service=github)](https://coveralls.io/github/gios-asu/sustainability-game?branch=develop)
[![Code Climate](https://codeclimate.com/github/gios-asu/sustainability-game/badges/gpa.svg)](https://codeclimate.com/github/gios-asu/sustainability-game)
[![Stories in Ready](https://badge.waffle.io/gios-asu/sustainability-game.png?label=ready&title=Ready)](http://waffle.io/gios-asu/sustainability-game)

# Development

## Setting up your environment

You will need:

* [NPM - install NodeJS to get NPM](https://nodejs.org/en/)
* [Meteor](https://www.meteor.com/install)

After those have been installed, clone this repo:

```sh
cd sustainability-game
npm install
meteor
```

You may have to run `sudo npm install` to get the NPM modules installed.

## Running Tests

Once you know meteor can run and launch without errors, you can run tests using:

```sh
npm test
```

## Writing Tests

Writing and running tests is an important part of any project.

Test files are "linked" to their source file. Say you are working on `client/components/home/title.jsx` and you want to write tests for it. Create a file: `client/components/home/tests/title.jsx`.

That file would look something like this:

```js
const { describe, it } = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import Title from '../title.jsx';

describe('Home title', () => {
  it('should display the title', () => {
    const title = {title: 'Sustainability Game'};
    const el = shallow(<Title title={title} />);
    expect(el.find('h2').text()).to.be.match(/Sustainability Game/);
  });
});
```

For more information on writing tests, read:

* [MochaJS](http://mochajs.org/) - this is our **test runner**
* [ChaiJS](http://chaijs.com/) - this is our **assertion library**
* [AirBnB:Enzyme Documentation](https://github.com/airbnb/enzyme) - this is the **React testing library** we use
* [Mantra Testing](https://kadirahq.github.io/mantra/#sec-Testing) - this is the **methodlogy** we follow


## PRs and Code Reviews

See [our code review guidelines](CODE_REVIEWS.md).

# Documentation

Please see the [Wiki](https://github.com/gios-asu/sustainability-game/wiki) for documentation on the development process, links to developer resources, and meeting notes.
