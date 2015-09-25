let config = {
	appTitle: 'NYPL | React Header',
	appName: 'NYPL DGX React Header',
	port: 3001,
	webpackDevServerPort: 3000,
	favIconPath: 'http://ux-static.nypl.org.s3-website-us-east-1.amazonaws.com/images/favicon.ico',
	socialMediaLinks: {
		facebook: 'https://www.facebook.com/nypl',
		twitter: 'https://twitter.com/nypl',
		instagram: 'https://instagram.com/nypl',
		tumblr: 'http://nypl.tumblr.com/',
		youtube: 'https://www.youtube.com/user/NewYorkPublicLibrary',
		soundcloud: 'https://soundcloud.com/nypl'
	},
	donationLinks: [
		{
			url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=55&s_src=FRQ16ZZ_TNN',
			amount: '$55'
		},
		{
			url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=115&s_src=FRQ16ZZ_TNN',
			amount: '$115'
		},
		{
			url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=250&s_src=FRQ16ZZ_TNN',
			amount: '$250'
		},
		{
			url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=0&s_src=FRQ16ZZ_TNN',
			amount: 'Other'
		}
	],
	refineryApi: {
		root: {
			development: 'http://dev.refinery.aws.nypl.org',
			qa: 'http://qa.refinery.aws.nypl.org',
			production: 'http://refinery.aws.nypl.org'
		},
		endpoint: '/api/nypl/ndo/v0.1/site-data/header-items',
		includes: [
      'children',
      'related-mega-menu-panes.current-mega-menu-item.images',
      'related-mega-menu-panes.current-mega-menu-item.related-content.authors.nypl-location',
      'related-mega-menu-panes.current-mega-menu-item.related-content.location',
      'related-mega-menu-panes.default-mega-menu-item.images',
      'related-mega-menu-panes.default-mega-menu-item.related-content.authors.nypl-location',
      'related-mega-menu-panes.default-mega-menu-item.related-content.location'],
    filters: {
      'relationships': {'parent': 'null'}
    }
	}
};

export default config;