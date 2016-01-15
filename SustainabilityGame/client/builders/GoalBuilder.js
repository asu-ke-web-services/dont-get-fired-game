GoalBuilder = class GoalBuilder extends Builder {
  constructor() {
    super();

    this.options = {};
    this.name = 'Default Name';
    this.description = 'Default Description';
    this.hooks = {};
  }

  setName(name) {
    this.name = name;
  }

  setDescription(description) {
    this.description = description;
  }

  setHooks(hooks) {
    this.hooks = hooks;
  }

  addHook(hookName, hookCallback) {
    this.hooks[hookName] = hookCallback;
  }

  removeHook(hookName) {
    delete this.hooks[hookName];
  }

  setFromOptions(options) {
    this.options = _.extend(this.options, options);
  }

  build() {
    return new Goal(this.options);
  }
}
