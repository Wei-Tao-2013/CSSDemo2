/*

 Description:  iSelect Gigya Integration Script(desktop & mobile)
 Author:       Kevin Tao
 Date:         Phase1 July 2015 , Phase2 Feb 2016

*/

;if(!window.console){
	console = {
		log 	: function(msg){},
		debug	: function(msg){},
		info 	: function(msg){},
		warn	: function(msg){},
		error	: function(msg){}
	};
}

;(function ( $, win, doc, undefined ){

	"use strict";

	win.gigya = win.gigya || {};

	gigya.elements = {
		// desktop 
		login					: $(".gigya-sign-in"),
		logout					: $(".gigya-sign-out"),
		signout_block			: $(".signout-block"),
		signin_block			: $(".signin-block"),
		register				: $("#gigya-register"),
		gigya_section			: $("#gigya-section"),
		gigya_nav				: $("#gigya-nav"),
		gigya_borad				: $("#gigya-borad"),
		gigya_brand 			: $(".gigya-brand"),
		gigya_avatar_default	: $(".gigya-avatar-default"),
		gigya_close 			: $(".gigya-close"),
		gigya_signin_banner		: $(".gigya-signin-banner"),
		customerName 			: $("#gigya-customer-name"),
		loginBookmark 			: $("#gigya-login-bookmark"),
		gigya_avatar 			: $("#avatar"),
		login_params 			: {containerID: "desktop-screens-section", screenSet : "iselect-desktop-v1-RegistrationLogin"},
		register_params 		: {startScreen:"gigya-register-screen"},
		desktop_screens_section : $('#desktop-screens-section'),
		slide_layer				: $('#slide-layer'),
		shades_grey				: $(".shadow-layer"),
		slide_close				: $("#slide-layer > button.mfp-close"), 
		promo_link				: $("#gigya-tile-promo"),
		save 					: $("#gigya-save"),
		save_indicator			: "false",  // check if page url need to be saved for returnning visitors   
		// mobile site
		mobile_login_params 	: {containerID: "mobile-screens-section", screenSet : "iselect-mobile-v1-RegistrationLogin"},
		mobile_login_params_new 	: {containerID: "desktop-screens-section", screenSet : "iselect-mobile-v1-RegistrationLogin"},
		mobile_gigya_borad		: $("#gigya-mobile-borad"),
		gigya_mobile_on			: $(".gigya-mobile-on"),
		mobile_page_slide		: "close",

		//new mobile site

		mobile_sign_new         : $("#mobile-sign-new"),

		//brand new feature    
		gigya_myaccount        	: $("#gigya-myaccount"),
		desktop_sign_new		: $("#desktop-sign-new")

	};

	gigya.params = {
		gigyaMaxExpiresDay 		: "30",  // default 30 days
		baseUrl 				: "",
		domainUrl				: "http://www.iselect.com.au",
		loginURL				: "",  // entry of back end for account login
		logoutURL				: "",  // entry of back end for account logout
		redirectNeed			: "false",
		redirectURL				: "",   // redicrect page(include pop up) afer gigay login
		redirectOtherPara 		: "" ,    //ex. page where the gigya login
		gigyaTimeout			: "99999999",
		vertical 				: "Health Insurance", //as defaut
		isMobileBrowsers		: false,//desktop as default,
		eventObject				: null ,
		versionNumber           : "1"  , // set current barnd new version is 2  
		mobileLogoutReq       : false   // indicator if request mobile welcome page
	};

	/**
	* Change gigya social sign in&out info or status on pages
	*/
	gigya.updateSocialStatus = function(){
		gigya.params.isMobileBrowsers ? gigya.updateMobileSocialStatus() : gigya.updateDesktopStatus();
	};

	/**
	* Change gigya social sign in&out info or status 
	* on pages for desktop browsers
	*/
    gigya.updateDesktopStatus = function(){
   		if($.cookie("gigya-UID")){     // sign in
				gigya.elements.gigya_borad.hide();
				gigya.elements.signin_block.hide();
				gigya.elements.signout_block.show();
				gigya.elements.customerName.text(gigya.getCustomerName());
				(gigya.params.redirectOtherPara ==="SF5") &&$('div.save> a[href="SaveSend_prepare.action"] >.save-title').text(" Email"); //Health SF save search text update
			if ($.cookie("gigya-avatar")){
				gigya.elements.gigya_avatar.show();
				gigya.elements.gigya_avatar.removeClass("gigya-avatar-default").removeClass("icon-gigya");
				gigya.elements.gigya_avatar.find(".avatar-img").attr("src",$.cookie("gigya-avatar")).show();
			}else{
				gigya.elements.gigya_avatar.hide();
			}
			//brand new account 
            gigya.elements.gigya_myaccount.show();
			//end of brand new account 
		}else{
			gigya.elements.signout_block.hide();
			gigya.elements.signin_block.show();
			gigya.elements.gigya_avatar.find(".avatar-img").hide();
			gigya.elements.gigya_avatar.addClass("gigya-avatar-default").addClass("icon-gigya");
			//brand new account 
            gigya.elements.gigya_myaccount.hide();
			//end of brand new account 
			(gigya.params.redirectOtherPara ==="SF5") && $('div.save> a[href="SaveSend_prepare.action"] >.save-title').text(" Save");
		}
    };

  

	/**
	* Change gigya social sign in&out info or status 
	* on pages for mobile device browsers
	*/
     gigya.updateMobileSocialStatus = function(){
    	if ( gigya.params.redirectOtherPara === "Homepage"){
			var $nav = $("nav#mobile-menu"),
				$nav_gigya = $("nav#mobile-menu > ul#mm-0 > li"),
				$mobile_gigya_singout = $("div.mobile-gigya-sign-out"),
				$mobile_avatar = $("div.mobile-avatar"),
				$mobile_social_title = $('li > a[title="Social Sign in"]'),
				$mobile_open =$('li > a[href="#mm-1"]');

			if($.cookie("gigya-UID")){ 
				$nav_gigya.removeClass('mm-opened');
				//$nav.trigger("close");
				$mobile_gigya_singout.show(); 
				$mobile_avatar.show();  
				$mobile_social_title.css("margin-right","0px");   
				$mobile_open.hide(); 
			if ($.cookie("gigya-avatar")){
				$mobile_avatar.removeClass("gigya-avatar-default");
				$mobile_avatar.find(".avatar-img").attr("src",$.cookie("gigya-avatar")).show();
				//brand new element 
				$("a.mobile-login").hide();
				$mobile_avatar.on("click",function(e){
					e.preventDefault(); 
					gigya.mobileWelcomePageCheck();
                    
				});
				//end of brand new element 
			}else{
				$mobile_avatar.find(".avatar-img").hide();
				$mobile_avatar.addClass("gigya-avatar-default");
			}
		}else{
				$mobile_gigya_singout.hide(); 
				$mobile_avatar.hide();
				$mobile_open.show(); 
				$mobile_social_title.css("margin-right","40px");   
				$mobile_avatar.find(".avatar-img").hide();
				$mobile_avatar.addClass("gigya-avatar-default");

				//brand new element 
				$("a.mobile-login").show();
				gigya.elements.mobile_gigya_borad.hide();
			 	gigya.elements.signout_block.hide();
				//end of brand new element 

		};
	  }else{
			//non home pages signin&out status updated
			var $btn_menu  = $("a.btn-menu"),
				$mobile_avatar    = $('<div class="mobile-avatar  gigya-avatar-default"><img class="avatar-img" /></div>');
				gigya.elements.mobile_gigya_borad.hide();
			 	gigya.elements.signout_block.hide();
            if($.cookie("gigya-UID")){ 
				$btn_menu.hide();
				$mobile_avatar.insertBefore('#header .contact-us');
				if ($.cookie("gigya-avatar")){
					$mobile_avatar.removeClass("gigya-avatar-default");
					$mobile_avatar.find(".avatar-img").attr("src",$.cookie("gigya-avatar")).show();
				}else{
					$mobile_avatar.find(".avatar-img").hide();
					$mobile_avatar.addClass("gigya-avatar-default");
				}
				$mobile_avatar.on("click",function(e){
				e.preventDefault(); 
                //add mobile welcome page slide in request 
  		        gigya.mobileWelcomePageCheck();
				//end of mobile welcome page slide in request	
               
              });
			  (gigya.params.redirectOtherPara ==="SF5") && $('div.save> a[href="SaveSend_prepare.action"] >.save-title').text(" Email");
			}else{
					$btn_menu.show();
					//gigya.elements.mobile_gigya_borad.hide();
					//gigya.elements.signout_block.hide();
					$("div.mobile-avatar").remove();
			  		(gigya.params.redirectOtherPara ==="SF5") && $('div.save> a[href="SaveSend_prepare.action"] >.save-title').text(" Save");
			};
	 }

    };

   
    gigya.mobileWelcomePageCheck = function(){
		if (gigya.params.domainUrl === "http://uat.iseldev.com" || gigya.params.domainUrl === "http://staging.iseldev.com") {gigya.params.domainUrl = "http://10.153.240.181"; } // for uat testing as the domain of iselect core on wordpress is inconsistent with sale funnel; 
		//gigya.params.domainUrl  = "http://localhost:8080";  //need to remove before staging
		console.log(gigya.params.loginURL);
		if (gigya.params.loginURL !== "" ){
			try{
				$.ajax({
				type: "POST",
				url: gigya.params.loginURL,
				data: {save_indicator:gigya.elements.save_indicator,gigyaurl:win.location.href,redirect:gigya.params.redirectNeed,newcustomer:$.cookie("gigya-newuser"),firstname:$.cookie("gigya-email"),provider:$.cookie("gigya-provider"),UID:$.cookie("gigya-UID"),email:$.cookie("gigya-email"),page:gigya.params.redirectOtherPara},
				success: function(data){
				console.log("retrived data from records "+ data);
				if(gigya.params.redirectNeed==="true" && data && ""!==data && "null" !== data ){
					console.log(gigya.params.domainUrl + gigya.params.redirectURL+"?redirectOtherPara="+ gigya.params.redirectOtherPara+"&redirect="+data);
					var $menuButton = $('.btn-menu'),
					$nav_gigya_a = $('nav#mobile-menu > ul#mm-0 > li > a[title="Social Sign in"]');
					$menuButton.click();
					$nav_gigya_a.parent('li').hasClass('mm-opened') || $nav_gigya_a.parent('li').addClass('mm-opened');
					gigya.welcomePageSlideIn(gigya.params.eventObject,"Click");
				}else{
					gigya.elements.mobile_gigya_borad.show();
					gigya.elements.signout_block.show();
				}
				},
				error: function(err){console.log(err);gigya.elements.mobile_gigya_borad.show();
										gigya.elements.signout_block.show();}
				});
			} catch(e){
				console.log("ajax component loading exceptions " + e);
				gigya.elements.mobile_gigya_borad.show();
				gigya.elements.signout_block.show();
			}
		}else{
			gigya.elements.mobile_gigya_borad.show();
			gigya.elements.signout_block.show();
		}
    };

   /* for brand new welcome page check if there is no page saved will display sign out otherwise welcome page shows up */
	gigya.welcomePageCheck = function(SlideType){
		if (gigya.params.domainUrl === "http://uat.iseldev.com" || gigya.params.domainUrl === "http://staging.iseldev.com") {gigya.params.domainUrl = "http://10.153.240.181"; } // for uat testing as the domain of iselect core on wordpress is inconsistent with sale funnel; 
		//gigya.params.domainUrl  = "http://localhost:8080";  //need to remove before staging
		console.log(gigya.params.loginURL);
		if (gigya.params.loginURL !== "" ){
			try{
			       $.ajax({
						type: "POST",
						url: gigya.params.loginURL,
						data: {save_indicator:gigya.elements.save_indicator,gigyaurl:win.location.href,redirect:gigya.params.redirectNeed,newcustomer:$.cookie("gigya-newuser"),firstname:$.cookie("gigya-email"),provider:$.cookie("gigya-provider"),UID:$.cookie("gigya-UID"),email:$.cookie("gigya-email"),page:gigya.params.redirectOtherPara},
						success: function(data){
									console.log("retrived data from records "+ data);
									if(gigya.params.redirectNeed==="true" && data && ""!==data && "null" !== data ){
										gigya.omniture.slideGigyaPage("WelcomeBack",gigya.params.vertical,SlideType);
											console.log(gigya.params.domainUrl + gigya.params.redirectURL+"?redirectOtherPara="+ gigya.params.redirectOtherPara+"&redirect="+data);
											gigya.elements.desktop_screens_section.empty();
											gigya.elements.desktop_screens_section.load(gigya.params.domainUrl + gigya.params.redirectURL+"?redirectOtherPara="+ gigya.params.redirectOtherPara+"&redirect="+data);
											gigya.pageSlide();
										
											data = "";
									}else{
									       // sign out page	 
									       gigya.slideOutsignoutPage();   
									}
								 },
							error: function(err){gigya.slideOutsignoutPage(); console.log(err);}
					});
				} catch(e){
					 gigya.slideOutsignoutPage(); 
					 console.log("ajax component loading exceptions " + e);
		 		}
		}else{
			 // sign out page
			 gigya.slideOutsignoutPage(); 	  
		}
	};

	/*for band new page of sign out page show up*/

   gigya.slideOutsignoutPage = function(){
   	    console.log(gigya.params.domainUrl + gigya.params.redirectURL+"?redirectOtherPara="+ gigya.params.redirectOtherPara+"&redirect=signOut");
		gigya.elements.desktop_screens_section.empty();
		var resluts = gigya.elements.desktop_screens_section.load(gigya.params.domainUrl + gigya.params.redirectURL+"?redirectOtherPara="+ gigya.params.redirectOtherPara+"&redirect=signOut");
		console.log("resluts is " + resluts);
		gigya.pageSlide();
   };


   /**
   * Return customer name (full name or first name ) from cookie
   * if fail to get social customer name the "Anonymity" instead 
   */
	gigya.getCustomerName = function(){
		var loginCustomer = ($.cookie("gigya-firstname")!=="undefined" && $.cookie("gigya-firstname") !=="") && $.cookie("gigya-firstname") ;
		if (loginCustomer){
			loginCustomer += ($.cookie("gigya-lastname")!=="undefined" && $.cookie("gigya-lastname") !=="") && (" "+$.cookie("gigya-lastname"));
		}
		if (!loginCustomer){
			loginCustomer = $.cookie("gigya-email");
			if (loginCustomer){
				loginCustomer = loginCustomer.split("@")[0]; 
			}
		}
		return loginCustomer || "Anonymity";
	};

   
   /**
    * loginHandler after customner sign in social media
   */
    gigya.loginEventHandler = function(eventObj){
		console.log("User logged in!");
		gigya.params.isMobileBrowsers || gigya.pageSlide();
		gigya.params.versionNumber === "2" && gigya.pageSlide(); // for barnc new version mobile device and destop use same slide page
		console.log("Profile details: " + JSON.stringify(eventObj.profile, null, 4));
		// Signature validation process ... not completed yet
		//Inject customer details into cookies
		console.log( gigya.params.gigyaMaxExpiresDay);
		var cookieExpired = parseInt(gigya.params.gigyaMaxExpiresDay);
		$.cookie("gigya-UID",eventObj.UID, {path:"/",expires:cookieExpired});
		$.cookie("gigya-newuser",eventObj.newUser, {path:"/",expires:1 });
		$.cookie("gigya-provider", eventObj.provider, {path:"/",expires: cookieExpired});
		$.cookie("gigya-firstname", eventObj.profile.firstName, {path:"/", expires:cookieExpired});
		$.cookie("gigya-lastname",  eventObj.profile.lastName, {path:"/", expires:cookieExpired});
		$.cookie("gigya-gender",  eventObj.profile.gender, {path:"/", expires: cookieExpired});
		$.cookie("gigya-avatar",  eventObj.profile.thumbnailURL, {path:"/", expires: cookieExpired});
		$.cookie("gigya-email",  eventObj.profile.email, {path:"/", expires: cookieExpired});
		gigya.elements.save.removeClass("save-gigya-hidden");
		//pre populate custmer information on SF4 of health vertical  
		gigya.params.vertical === "Health Insurance" &&  gigya.params.redirectOtherPara ==="SF4" &&  $.cookie("gigya-UID") && gigya.prePopulateCustomer();
		gigya.updateSocialStatus();
		//eventObj.newUser && console.log("User is first time login");
	    //vertical back end entry for login
	    gigya.params.eventObject =eventObj;
		gigya.welcomePageSlideIn(eventObj,"Auto");
		
	};

	//welcome page process as customer signed in
	gigya.welcomePageSlideIn = function(eventObj,SlideType){
		console.log(gigya.params.domainUrl );
		if (gigya.params.domainUrl === "http://uat.iseldev.com" || gigya.params.domainUrl === "http://staging.iseldev.com") {gigya.params.domainUrl = "http://10.153.240.181"; } // for uat testing as the domain of iselect core on wordpress is inconsistent with sale funnel; 
		//gigya.params.domainUrl  = "http://localhost:8080";  //need to remove before staging
		console.log(gigya.params.loginURL);
		//gigya.params.loginURL = "http://localhost:8080/CDSX/IntegrateGigya_gigyaLogin.action"; 
		//gigya.params.redirectURL =
	
		if (gigya.params.loginURL !== "" ){
			try{
			       $.ajax({
						type: "POST",
						url: gigya.params.loginURL,
						data: {save_indicator:gigya.elements.save_indicator,gigyaurl:win.location.href,redirect:gigya.params.redirectNeed,newcustomer:$.cookie("gigya-newuser"),firstname:$.cookie("gigya-email"),provider:$.cookie("gigya-provider"),UID:$.cookie("gigya-UID"),email:$.cookie("gigya-email"),page:gigya.params.redirectOtherPara},
						success: function(data){
									console.log("retrived data from records "+ data);
									//disable button after saved
									gigya.elements.save_indicator ==="true" && $("#gigya-save").val("Saved").css("background","linear-gradient(#cfd1d3, #cfd1d3)").prop("disabled",true);
									//for saving url the welcompage don't need to show up
									if(gigya.elements.save_indicator !=="true" && gigya.params.redirectNeed==="true" && data && ""!==data && "null" !== data ){
										gigya.omniture.slideGigyaPage("WelcomeBack",gigya.params.vertical,SlideType);
											console.log(gigya.params.domainUrl + gigya.params.redirectURL+"?redirectOtherPara="+ gigya.params.redirectOtherPara+"&redirect="+data);
										if(gigya.params.isMobileBrowsers && gigya.params.versionNumber !== "2"){
											var $mobile_containerID = $("div#mobile-screens-section"), $nav = $("nav#mobile-menu");
												$mobile_containerID.load(gigya.params.domainUrl + gigya.params.redirectURL+"?redirectOtherPara="+ gigya.params.redirectOtherPara+"&redirect="+data);
											    console.log("Mobile welcome page");
										 }else{
											gigya.elements.desktop_screens_section.empty();
											gigya.elements.desktop_screens_section.load(gigya.params.domainUrl + gigya.params.redirectURL+"?redirectOtherPara="+ gigya.params.redirectOtherPara+"&redirect="+data);
											gigya.pageSlide();
										 }
											data = "";
									}else{
										    
											gigya.params.isMobileBrowsers && gigya.mobileWelcomePageSlide();
									}
								 },
							error: function(err){console.log(err);}
					});
				} catch(e){
					
					console.log("ajax component loading exceptions " + e);
		 		}
		}else{
		
			gigya.params.isMobileBrowsers && gigya.mobileWelcomePageSlide();  
		}
	};
 
	gigya.registerEventHandler = function(eventObj){
		console.log("User has registed");
		console.log(JSON.stringify(eventObj, null, 4));
		gigya.pageSlide();
	};

    gigya.mobileWelcomePageSlide = function(e){
		var $mobile_containerID = $("div#mobile-screens-section");
		$mobile_containerID.removeClass("loaded").addClass("unloaded");
		gigya.params.redirectOtherPara ==="Homepage"  ?  gigya.mobilePageSlide() : function(){var $nav = $("nav#mobile-menu"); $nav.trigger("close");}()
	};

	gigya.mobilePageSlide = function(e){
		var $nav = $("nav#mobile-menu"),
			$nav_gigya = $("nav#mobile-menu > ul#mm-0 > li"),
			$mobile_gigya_singout = $("div.mobile-gigya-sign-out"),
			$mobile_avatar = $("div.mobile-avatar"),
			$mobile_social_title = $('li > a[title="Social Sign in"]'),
			$mobile_open =$('li > a[href="#mm-1"]');

			$nav_gigya.removeClass('mm-opened');
			$mobile_gigya_singout.show(); 
			$mobile_avatar.show();  
			$mobile_social_title.css("margin-right","0px");   
			$mobile_open.hide(); 
	};

	/**
    * Pre-populate fields for health vertial on sf4
	*/
	gigya.prePopulateCustomer = function(e){
		try{
			healthSF.elements.customerName.val().trim() === "" && function(){healthSF.elements.customerName.val(gigya.getCustomerName());}();
			healthSF.elements.customerEmail.val().trim() === "" && function(){healthSF.elements.customerEmail.val($.cookie("gigya-email"));}();	
		}catch(e){
			console.log("Pre-populate customer infomaton error " + e);
		}

	};

   /**
    * Logout Handler after customner sign out social media
   */
	gigya.logoutEventHandler = function(eventObj){
		console.log("User has logged out");
		if (gigya.params.logoutURL !==""){
			try{
				$.ajax({
						url: gigya.params.logoutURL,
						data: {gigyaurl:win.location.href,redirect:gigya.params.redirectNeed,newcustomer:$.cookie("gigya-newuser"),firstname:$.cookie("gigya-email"),provider:$.cookie("gigya-provider"),UID:$.cookie("gigya-UID"),email:$.cookie("gigya-email"),page:gigya.params.redirectOtherPara},
						success: function(){
							console.log("back end process sucessfully");
						},
						error: function(err){console.log(err);}
					});
			}catch(e){
				console.log("ajax component loading exceptions " + e);
			}
		}
		$.removeCookie("gigya-UID",{ path:"/"});
		$.removeCookie("gigya-provider",{ path:"/"});
		$.removeCookie("gigya-firstname",{ path:"/" });
		$.removeCookie("gigya-lastname",{ path:"/" });
		$.removeCookie("gigya-gender",{ path:"/"  });
		$.removeCookie("gigya-avatar",{ path:"/" });
		$.removeCookie("gigya-email",{ path:"/"});
		gigya.updateSocialStatus(); 
		gigya.elements.loginBookmark.attr("href","");

	};

    gigya.pageSlide = function(e){
  		if(gigya.elements.shades_grey.css('display') === "block"){
				gigya.elements.shades_grey.css("display","none");
				gigya.elements.slide_layer.removeClass("slideIn");
			}else{
				gigya.elements.shades_grey.css("display","block");
				gigya.elements.slide_layer.css("overflow","auto");
				gigya.elements.slide_layer.addClass("slideIn");
			}
	};
 
    gigya.pageAutoSlide = function(timeout){
		$.cookie("gigya-UID") || function() {setTimeout(function(){
			if (gigya.params.isMobileBrowsers) {
				if ( gigya.elements.mobile_page_slide==="close"){
					var $menuButton = $('.btn-menu'),
					$nav_gigya_a = $('nav#mobile-menu > ul#mm-0 > li > a[title="Social Sign in"]');
					$menuButton.click();
					$nav_gigya_a.parent('li').hasClass('mm-opened') || $nav_gigya_a.parent('li').addClass('mm-opened');
					gigya.omniture.slideGigyaPage("Prompt",gigya.params.vertical);
				}
			}else{
				if (gigya.elements.shades_grey.css('display') !== "block"){
					if(gigya.accounts && !$.isEmptyObject(gigya.accounts)){
						gigya.accounts.showScreenSet(gigya.elements.login_params);
					}
					gigya.omniture.slideGigyaPage("Prompt",gigya.params.vertical);
					gigya.pageSlide();
				}
			}
		},parseInt(timeout));}();
 	};

    //gigya phase 2 save sales funnel (health only) 
    gigya.elements.save.on("click",function(event){
       // if customer signed in
		if ($.cookie("gigya-UID") ){
			try{
				$.ajax({
					type: "POST",
					url: "/CDSX/IntegrateGigya_gigyaUrlSaved.action",
					data: {gigyaurl:win.location.href,UID:$.cookie("gigya-UID")},
					success: function(){
						console.log("Save customer url sucessfully. ");
						$("#gigya-save").val("Saved").css("background","linear-gradient(#cfd1d3, #cfd1d3)").prop("disabled",true);
					},
					error: function(err){console.log(err);}
				});
			}catch(e){
				console.log("ajax component loading exceptions " + e);
			}
		}else{ // if customer not sign in 
			gigya.elements.save_indicator = "true";
			if (gigya.params.isMobileBrowsers){
			var 	$menuButton = $('.btn-menu'),
				$nav_gigya_a = $('nav#mobile-menu > ul#mm-0 > li > a[title="Social Sign in"]');
				$menuButton.click();
			$nav_gigya_a.parent('li').hasClass('mm-opened') || $nav_gigya_a.parent('li').addClass('mm-opened');
			}else{
				if(gigya.accounts && !$.isEmptyObject(gigya.accounts)){
					gigya.accounts.showScreenSet(gigya.elements.login_params);
				}
				gigya.pageSlide();
			}
		};

		var formObject = null ;
		switch (gigya.params.redirectOtherPara){
		case "SF2" :
			formObject = $("#sf2");
			break;
		case "SF3" :
			formObject = $("#sf3"); 
			break;
		case "SF4" :
			formObject = $("#sf4");
			break;
		}
		formObject && gigya.pageFormSaved(event,formObject);

		//omniture 
		gigya.omniture.saveButton(gigya.params.redirectOtherPara,healthSF.sessionVariables.sessionId);
	
	});

	//gigya phase 2 page form data saved before pages sumbit (health)
	gigya.pageFormSaved = function(e,formObject){
		try{
			$.ajax({
				type: "POST",
				url: "/CDSX/IntegrateGigya_gigyaPageSave.action?page="+gigya.params.redirectOtherPara,
				data: formObject.serialize(),
				success: function(){
					console.log("Save customer page data sucessfully. ");
				},
				error: function(err){console.log(err);}
			});

		}catch(e){
			console.log("ajax component loading exceptions for page data saving " + e);
		}
	};

	gigya.elements.promo_link.on("click",function(e){
		e.preventDefault();
		if (gigya.params.isMobileBrowsers){
			//if ( gigya.params.redirectOtherPara === "Homepage"){
			var $menuButton = $('.btn-menu'),
				$nav_gigya_a = $('nav#mobile-menu > ul#mm-0 > li > a[title="Social Sign in"]');
				$menuButton.click();
				$nav_gigya_a.parent('li').hasClass('mm-opened') || $nav_gigya_a.parent('li').addClass('mm-opened');
		    // 	}
		}else{
			if(gigya.accounts && !$.isEmptyObject(gigya.accounts)){
				gigya.accounts.showScreenSet(gigya.elements.login_params);
			}
			gigya.pageSlide();
		}
	});

  	// brand new 
	gigya.elements.gigya_myaccount.on("click",function(e){
		e.preventDefault();
		gigya.welcomePageCheck("click");

	});

	gigya.elements.desktop_sign_new.on("click",function(e){
		e.preventDefault();
		if($.cookie("gigya-UID")){
			gigya.welcomePageCheck("click");
		}else{
			gigya.elements.login.trigger("click");
		}

	});

 	// end of barnd new

	gigya.elements.customerName.on("click",function(e){
		e.preventDefault();
		gigya.welcomePageCheck("click");
		//gigya.welcomePageSlideIn(gigya.params.eventObject,"Click");
	
	});


	gigya.elements.gigya_avatar.on("click",function(e){
		e.preventDefault();
		gigya.welcomePageCheck("click");
		//gigya.welcomePageSlideIn(gigya.params.eventObject,"Click");

	});


	gigya.elements.shades_grey.on("click",function(e){
		e.preventDefault();
		gigya.pageSlide();
	});

	gigya.elements.slide_close.on("click", function(e){
		e.preventDefault();
		gigya.pageSlide();
	});

	//Event Listerners
	gigya.elements.login.on("click", function(e){
		e.preventDefault();
		gigya.omniture.slideGigyaPage("SignIn",gigya.params.vertical);
		if(gigya.accounts && !$.isEmptyObject(gigya.accounts)){
			gigya.accounts.showScreenSet(gigya.elements.login_params);
		}
		//gigya.elements.desktop_screens_section.removeClass("unloaded").addClass("loaded");
		gigya.pageSlide();

		//gigya.updateSocialStatus();

	});
	
	gigya.elements.register.on("click", function(e){
		e.preventDefault();
		gigya.omniture.slideGigyaPage("Registration",gigya.params.vertical);
		if(gigya.accounts && !$.isEmptyObject(gigya.accounts)){
			gigya.accounts.showScreenSet(gigya.elements.login_params,gigya.elements.register_params);
		}
 		//gigya.elements.desktop_screens_section.removeClass("unloaded").addClass("loaded");
		gigya.pageSlide();
	});

	gigya.elements.gigya_close.on("click",function(e){
		e.preventDefault();
		gigya.elements.gigya_borad.hide();

	});

	gigya.elements.logout.on("click", function(e){
		e.preventDefault();
		if(gigya.accounts && !$.isEmptyObject(gigya.accounts)){
			gigya.accounts.logout({
				forceProvidersLogout: true, 
				callback:gigya.onLogout
			});
		}
	});	



	//Event handlers
	if (gigya.accounts && !$.isEmptyObject(gigya.accounts) && gigya.accounts.addEventHandlers) {  
		gigya.accounts.addEventHandlers({
			onLogin:gigya.loginEventHandler,
			onLogout:gigya.logoutEventHandler
		});
     }else{
		console.log("can't get property of gigya.accounts.addEventHandlers");
     }
   
	gigya.init = function(){
		gigya.paramsInit();
		//initialize mobile device browsers
		gigya.params.isMobileBrowsers && gigya.mobileInit(); 
		gigya.updateSocialStatus();
		//gigya.omniture.SignInStatus();
		gigya.elements.gigya_section.show();
		gigya.params.gigyaTimeout === "99999999" || gigya.pageAutoSlide(gigya.params.gigyaTimeout);
		console.log(gigya.params);
	};


	gigya.paramsInit = function() {
		if (gigya.params.gigyaMaxExpiresDay === "null" || gigya.params.gigyaMaxExpiresDay === "" ){
			gigya.params.gigyaMaxExpiresDay = "30";
		}
		if (gigya.params.redirectNeed === "null" || gigya.params.redirectNeed === "" ){
				gigya.params.redirectNeed = "false";
		}
		if (gigya.params.vertical === "null" || gigya.params.redirectNeed === "" ){
				gigya.params.vertical = "Health Insurance";
		}
		if (gigya.params.loginURL === "null" ){
				gigya.params.loginURL = "";
		}
		if (gigya.params.logoutURL === "null" ){
				gigya.params.logoutURL = "";
		}
		if (gigya.params.redirectURL === "null" ){
				gigya.params.redirectURL = "";
		}
		if (gigya.params.gigyaTimeout ==="null" || gigya.params.gigyaTimeout === "" ){
				gigya.params.gigyaTimeout = "99999999";
		}
		//detect if browser is mobile device standard
		gigya.params.isMobileBrowsers = (gigya.elements.gigya_mobile_on.css('display')==="block");
	};

	gigya.mobileInit = function() {
		var $nav_gigya = $('nav#mobile-menu > ul#mm-0 > li > a[title="Social Sign in"]'),
			$nav = $("nav#mobile-menu"),
			$mm_header =$("div.mm-header"),
			$nav_gigya_a = $("nav#mobile-menu > ul#mm-0 > li > a.mm-subopen"),
			$btn_menu  = $("a.btn-menu"),
			$mobile_gigya_singout = $("div.mobile-gigya-sign-out");

		gigya.loadMobileGigyaPages();
		$nav_gigya.on("click",'a', function (e) { 
			var $this = $(this);
			e.preventDefault();
			gigya.omniture.slideGigyaPage("SignIn",gigya.params.vertical);
			// locate the first submenu which is for gigya social 
			if($this.parent('li').hasClass('mm-opened') && $this.attr("href")==='#mm-1'){  
			//gigya.accounts.showScreenSet(gigya.elements.mobile_login_params);
				gigya.loadMobileGigyaPages();
			}
		});

		$mobile_gigya_singout.on("click",function(e){
			e.preventDefault();
			// mobile page set back to unloaded
			var $mobile_containerID = $("div#mobile-screens-section");
			$mobile_containerID.removeClass("loaded").addClass("unloaded");
			if (gigya.accounts && !$.isEmptyObject(gigya.accounts)) {
			gigya.accounts.logout({
				forceProvidersLogout: true, 
				callback:gigya.onLogout
			});
		}
		});
       
       // non hompage soical sign in page on mobile browsers need to be adjuested before it is sliding in on mobile site 
       if ( gigya.params.redirectOtherPara !== "Homepage"){
			var $nav_colse = $('nav#mobile-menu > ul#mm-0 > li ');
			$btn_menu.css("background-position","397px 43px").css("background-color","#fff").css("top","10px").css("text-indent","0px");
			$btn_menu.append("<div id='sign-text'>");
			$("div#sign-text").text("SIGN IN");
			$mm_header.hide();
			$nav_colse.on("click",'a', function (e) { 
				var $this = $(this);
				e.preventDefault();
				// locate the first submenu which is for gigya social 
				if(!$this.parent('li').hasClass('mm-opened') && $this.attr("href")==='#mm-1'){  
					$this.parent('li').parent('ul').hide();
					$nav.trigger("close");
					gigya.elements.mobile_page_slide = "close";
				}
			});
	        $btn_menu.on("click",function(e){
				e.preventDefault();
				gigya.omniture.slideGigyaPage("SignIn",gigya.params.vertical);
				$nav_gigya_a.parent('li').parent('ul').show();
				$nav_gigya_a.parent('li').hasClass('mm-opened') || $nav_gigya_a.parent('li').addClass('mm-opened');
				gigya.loadMobileGigyaPages();
				gigya.elements.mobile_page_slide = "open";
	         });
       };

       ///for brand new mobile page 
			gigya.elements.mobile_sign_new.on("click", function(e){
			e.preventDefault();
			gigya.params.versionNumber ="2"  // set inditcator of version 2 for brand new 
			/*gigya.omniture.slideGigyaPage("SignIn",gigya.params.vertical);
			gigya.loadMobileGigyaPages();
			gigya.elements.mobile_page_slide = "open";*/
			if (gigya.accounts && !$.isEmptyObject(gigya.accounts)) {
			gigya.accounts.showScreenSet(gigya.elements.mobile_login_params_new);
			}
			//gigya.elements.desktop_screens_section.removeClass("unloaded").addClass("loaded");
			gigya.pageSlide();
		//	gigya.updateSocialStatus();
			}); 

    };


 
	gigya.loadMobileGigyaPages = function(){
		var $mobile_containerID = $("div#mobile-screens-section");
		// gigya.accounts.showScreenSet(gigya.elements.mobile_login_params);
		if($mobile_containerID.hasClass("unloaded")) {
			if (gigya.accounts && !$.isEmptyObject(gigya.accounts)) {
			gigya.accounts.showScreenSet(gigya.elements.mobile_login_params);
			}
			$mobile_containerID.removeClass("unloaded").addClass("loaded");
		};
	};
	
	gigya.iselect = {
		logoutEnventHandler:function(e){
			if (gigya.accounts && !$.isEmptyObject(gigya.accounts)) {
				gigya.accounts.logout({
				forceProvidersLogout: true
			});
		}
			gigya.logoutEventHandler(e);
		},
		loginEnventHandler:function(){
			if(gigya.accounts &&!$.isEmptyObject(gigya.accounts)){
				gigya.accounts.showScreenSet(gigya.elements.login_params);
			}
		},
		loginFaceBook: function(callbackHandler){
			var params = {callback:callbackHandler, provider: "facebook"};
			if (gigya.socialize){
				gigya.socialize.login(params);
			}
		},

		loginGooglePlus: function(callbackHandler){
			var params = { callback: callbackHandler, provider: "googleplus" };
			if (gigya.socialize){
				gigya.socialize.login(params);
			}
		},
		isMobileBrowsers:function(){
			return gigya.params.isMobileBrowsers;
		}

    };
  
   $(function(){
    	gigya.init();
    	//gigya.socialize.showLoginUI(null);
	});

})( jQuery, window, document );

/*
   omniture for gigya 
   parameter pageName : Registration,  SignIn ,WelcomeBack,Prompt
             channel (for varity verticals) : Health Insurance, Car, Life, homeloans, energy, broaband, homeAndContents
*/
;(function ($, win, doc, undefined) {
	"use strict";
	gigya.omniture ={
		slideGigyaPage : function(pageName,channel,slideType){
			try{
				var s = s_gi(s_account);
					s.linkTrackVars = "events,eVar64,eVar63,eVar70,prop64,prop42";
					s.linkTrackEvents = "event83";
					s.events ="event83";
				switch (pageName){
				  case "Registration" :
					s.events="event83";
					s.eVar64="Gigya - Registration";
					s.prop64="Gigya - Registration";
					s.tl(this, "o", "Register Slide Out");
					break;
				  case "SignIn" :
					s.events="event83";
					s.eVar64="Gigya - Sign-In";
					s.prop64="Gigya - Sign-In";
					s.tl(this, "o", "Sign-In Slide Out");
					break;
				  case "WelcomeBack" :
					s.events="event83";
					s.eVar64="Gigya - Welcome Back - "+slideType;
					s.prop64="Gigya - Welcome Back - "+slideType;
					s.prop42="Logged In - Returning";
					s.eVar70="Logged In - Returning";
					s.eVar63= $.cookie("gigya-UID");
					s.tl(this, "o", "Welcome Back Slide Out");
					break;
				  case "Prompt":    
					s.events="event83";
					s.eVar64="Gigya - Inactivity Sign-In Prompt";
					s.prop64="Gigya - Inactivity Sign-In Prompt";
					s.tl(this, "o", "Inactivity Sign In Prompt");
					break;
				}
			}catch(e){
				console.log(" omniture exceptions : " + e);
			};
		},
       SignInStatus : function(){
			try{
				if($.cookie("gigya-UID")){ 
					s.eVar63 =  $.cookie("gigya-UID");
					if($.cookie("gigya-newuser") ==="true"){
						s.prop42 ="Logged In - New";
						s.eVar70 = "Logged In - New";
					}else{
						s.prop42 ="Logged in - Returning";
						s.eVar70 = "Logged in - Returning";
					}
				}else{
					s.prop42 ="Anonymous";
					s.eVar70 = "Anonymous";
				}
			}
			catch(e){
				console.log(" omniture exceptions : " + e);
			};
		},
		
		saveButton : function(pageName,sessionID){
			try{
				var s = s_gi(s_account);

				if($.cookie("gigya-UID")){  //sign in
					s.linkTrackVars = "events,eVar63,eVar64,eVar70,prop40,prop42,prop64";
					s.linkTrackEvents = "event84";
					s.events="event84";
					s.prop40= sessionID;
					s.prop64= "Gigya -Save Button -" + pageName;
					s.eVar64= "Gigya -Save Button -" + pageName;
					if($.cookie("gigya-newuser") ==="true"){
						s.prop42 ="Logged In - New";
						s.eVar70 = "Logged In - New";
					}else{
						s.prop42 ="Logged in - Returning";
						s.eVar70 = "Logged in - Returning";
					}
                    s.eVar63 = $.cookie("gigya-UID");
					s.tl(this, "o", "save button");
				}else{              // not sign in
					s.linkTrackVars = "events,eVar64,eVar70,prop40,prop42,prop64";
					s.linkTrackEvents = "event83,event84";
					s.events="event83,event84";
					s.prop40= sessionID;
					s.prop64= "Gigya - Sign-In -Save Button -" + pageName;
					s.eVar64= "Gigya - Sign-In -Save Button -" + pageName;
					s.prop42= "Anonymous";
					s.eVar70= "Anonymous";
					s.tl(this, "o", "save button");
				}

			}catch(e){
				console.log(" omniture exceptions : " + e);
			};

		},

		displaySaveButton : function(show){
			try{
				if (show){
					s.eVar23 = "Save Button";
					s.prop23 = "Save Button";
				}else{
					s.eVar23 = "Default - No Save Button";
					s.prop23 = "Default - No Save Button";
				}
			}catch(e){
				console.log(" omniture exceptions : " + e);
			}
		} ,


	finishComparison : function(pageName){
			try{
				var s = s_gi(s_account);
					s.linkTrackVars = "eVar64,prop64";
				    s.linkTrackEvents = "event86";
				    s.events="event86";
					s.prop64= "Gigya - Finish Comparison -" + pageName;
					s.eVar64= "Gigya - Finish Comparison -" + pageName;
					s.tl(this, "o", "finish comparison");
			}catch(e){
				console.log(" omniture exceptions : " + e);
			};
		} 

	};


})(jQuery, window, document);