define( [
		'app/app'
		,'backbone.marionette'
		,'backbone'
		,'tmpl!templates/search.html'
	], function (
		app
		,Marionette
		,Backbone
		,searchTemplate) {
	return Marionette.ItemView.extend({
		template: searchTemplate,
		
		className: 'repeater-search',
		
		initialize: function () {
			this.model = new Backbone.Model({
				placeholder: 'Search Tags'
			});
		},
		
		events: {
			'click .btn': 'search'
		},
		
		search: function () {
			var $searchInput = this.$('input');
			var searchText = $searchInput.val();
			this.trigger('search', searchText);
		}
	});
});