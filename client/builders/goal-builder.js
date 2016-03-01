import Builder from './definition/builder';
import Goal from '../models/goal';

/**
 * The Goal Builder allows you to lazily build
 * goals.
 *
 * @type {Builder}
 */
export default class GoalBuilder extends Builder {
  constructor() {
    super();

    this.name = 'Default Name';
    this.description = 'Default Description';
    this.hooks = {};
  }

  setName( name ) {
    this.name = name;
  }

  setDescription( description ) {
    this.description = description;
  }

  setHooks( hooks ) {
    this.hooks = hooks;
  }

  addHook( hookName, hookCallback ) {
    this.hooks[hookName] = hookCallback;
  }

  removeHook( hookName ) {
    delete this.hooks[hookName];
  }

  setFromOptions( options ) {
    if ( options.name ) {
      this.name = options.name;
    }

    if ( options.description ) {
      this.description = options.description;
    }

    if ( options.hooks ) {
      this.hooks = options.hooks;
    }
  }

  /**
   * @override
   * @return {Goal}
   */
  build() {
    let options = {
      name: this.name,
      description: this.description,
      hooks: this.hooks
    };

    return new Goal( options );
  }
}
