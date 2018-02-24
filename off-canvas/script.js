/**
 * @file This file provides functionality that control the *Off-Canvas*
 * behavior of the layout for the small screen. 
 * @description Specifically the following is the functionality:
 * 1)   Control side menu behavior. Side menu is shown
 *      only for small screen layout.
 * 2)   Scroll to sections using links provided in Side menu and
 *      Top menu. The scroll position is adjusted to account for
 *      space occupied for Top menu.
 * @author Amrik Singh.
 * @version 0.1 
 */
$(document).ready(function(event){

    /**
     * @description Adjust colors for background and text for the Navigation bar at
     * the top of the screen. This is required
     * for both small screen and large screen
     * sizes, when resizing window or
     * scrolling window.
     * @param {String} bgColor - Background Color of Nav Bar.
     * @param {String} textColor - Color of text in Nav Bar.
     * @returns - none.
     */
    var applySideMenuBgAndFontColor = function(bgColor, textColor){

        $('.menu-control').css("background-color", bgColor);
        $('.nav-bar .menu-control a').css("color", textColor);
    }

    /**
     * @description Check the size of the screen
     * and also for the position of scroll.
     * @param {Number} pos - Position of the scroll.
     * @returns - none.
     */
    var setSideMenuBgSmallScreen = function(pos){

        if ($('.dummy-header').width()  <  992 ){          
            if (pos > 0) {
                applySideMenuBgAndFontColor("#24665e", "#fff");
            }else{
                applySideMenuBgAndFontColor("transparent", "#24665e");
            }
         }else{
            applySideMenuBgAndFontColor("transparent", "#24665e");                     
         }
    }

    /**
     * @description Three sections are taken off
     * screen for small screen sizes. The three sections are:
     * 1) Nav menu for four sections.
     * 2) Subscribe section
     * 3) Contact section
     * These are accessible via top menu icons for these sections
     */   

    $('.menu-control a').on('click', function(event){
        var elem = $(this).attr("target");
        console.log(elem);
        if( typeof elem !== "undefined"){

        
            $(elem).animate({'width':'show'}, 350);
            $(".close-side-menu-icon").delay(0).fadeIn(350);
            event.preventDefault();
        }
    });

    $('.close-side-menu-icon').on('click', function(event){
        $('.side-menu, #subscribe, #contact').animate({'width':'hide'}, 350);
        $(".close-side-menu-icon").css("display", "none");
        event.preventDefault();
    });

    /**
     * @description Register Navigation links for 
     * click events for scrolling to corresponding sections
     */

    $('.side-menu a').on('click', function(){

        var elem = $(this).attr("href");

        $('html, body').animate({
            scrollTop: $(elem).offset().top - 70
        }, 'slow');

        var isSideMenuLink = (elem === "#subscribe" || elem === "#contact") ? false : true;

        if ( isSideMenuLink && $('.dummy-header').width()  <  992 ){
            $('.close-side-menu-icon').trigger('click');
        }
    });

    /**
     * @description Check scroll position.
     */
    var pos = $(window).scrollTop();

    /**
     * Call function to set background and text
     * color of navigation bar.
     * 
     */
    setSideMenuBgSmallScreen(pos);

    /**
     * @description Register for window scroll,
     * load or resize events and set background and
     * text color of navigation bar.
     */
    $(window).on('scroll load resize', function() {
        var pos = $(this).scrollTop();
        setSideMenuBgSmallScreen(pos);
    });


});

