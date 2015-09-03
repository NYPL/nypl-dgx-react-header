let config = {
	appTitle: 'NYPL | React Header',
	appName: 'NYPL DGX React Header',
	port: 3001,
	webpackDevServerPort: 3000,
	favIconPath: 'http://ux-static.nypl.org.s3-website-us-east-1.amazonaws.com/images/favicon.ico',
	apiUrl: 'http://dev.refinery.aws.nypl.org/api/nypl/ndo/v0.1/site-data/header-items?filter%5Brelationships%5D%5Bparent%5D=null&include=children,related-mega-menu-panes.current-mega-menu-items.images',
	socialMediaLinks: {
		facebook: 'https://www.facebook.com/nypl',
		twitter: 'https://twitter.com/nypl',
		instagram: 'https://instagram.com/nypl',
		tumblr: 'http://nypl.tumblr.com/',
		youtube: 'https://www.youtube.com/user/NewYorkPublicLibrary',
		soundcloud: 'https://soundcloud.com/nypl'
	}
};

export default config;