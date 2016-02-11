Package.describe({
  name: 'facebook:flux',
  version: '1.0.0',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.addFiles('flux.js', ['client']);
  api.export(['Flux']);
});
