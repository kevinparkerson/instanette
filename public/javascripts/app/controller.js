define(	[
		'./app'
		,'config'
		,'backbone'
		,'models/feed'
		,'models/search-tag'
		,'models/search-geography'
		,'models/mediaItem'
		,'views/navigation'
		,'views/home'
		,'views/tags'
		,'views/geography'
		,'views/media-item-detail'
	], function (
		app
		,config
		,Backbone
		,FeedCollection
		,TagCollection
		,GeographyCollection
		,MediaItemModel
		,NavigationView
		,HomeView
		,TagsView
		,GeographyView
		,MediaItemDetailView) {
	
	app.addInitializer(function () {
		app.models.set({
			mediaItems: new FeedCollection(),
			tagItems: new TagCollection(),
			geographyItems: new GeographyCollection()
		});
		
		var navigationView = new NavigationView();
		app.navigationRegion.show(navigationView);
	});

	var currentCollection;

	var controller = {
		home: function () {
			var collection = app.models.get('mediaItems');
			collection.fetch();
			
			currentCollection = collection;
			
			app.mainRegion.show(new HomeView({
				collection: collection
			}));
		},
		tags: function () {
			var collection = app.models.get('tagItems');
			collection.fetch();
			
			currentCollection = collection;
			
			app.mainRegion.show(new TagsView({
				collection: collection
			}));
		},
		geography: function () {
			var collection = app.models.get('geographyItems');
			collection.fetch();
			
			currentCollection = collection;
			
			app.mainRegion.show(new GeographyView({
				collection: collection
			}));
		},
		mediaItem: function (id) {
			var model;
			
			if (currentCollection) {
				model = currentCollection.get(id);
			}
			
			// Just in case the collection hasn't been fetched yet, or this item isn't in the collection...
			if (!model) {
				model = new MediaItemModel({
					id: id
				});
				
				model.fetch();
			}
			
			app.mainRegion.show(new MediaItemDetailView({
				model: model
			}));
		}
	};

	return controller;
});