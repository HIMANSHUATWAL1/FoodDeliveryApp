# -----------------------Initializing Front-End------------------------>

1. first create frontend folder with vite+react.
2. then install the "React-router-dom " package 

# React Router DOM-->

     React Router DOM is an npm package that enables you to implement dynamic routing in a web app. It allows you to display pages and allow users to navigate them. It is a fully-featured client and server-side routing library for React.

# External Font---->

we are using external font "outfit font" website(google).

# for current page scenario in the navbar  page name will underlined-->

for this effect we are using "useState hook"

# so next we will design basket dot effect--->
# (.dot class-->)
if basket will empty the dot will be hiiden .


# next we provide path for our pages from "react-router-dom"

1. import in main.jsx
2. import in app.jsx
     set the path for all pages.


# In header page we are creating some FadeIn effect ---->
----> fadeIn(keyframe name)

1. we include in index.css-->

 @keyframs fadeIn {
     0%{
          opacity:0;
     }
     100%{
          opacity:1;
     }

}


2. In header.css we use property 
.header-contents{
   animation :fadeIn 3s;
}





# After Header we are Creating "Explore menu" where we have " array of objects "   .Inside object we have menu name and menu image.

so we import menu list from assests/assests.js

then inside div we render this menu list using " map method"





# After this we use useState hook for setting category of Explore menu in " Home.jsx " .

# we pass category and setCategory as " Props " in "ExploredMenu"

# we create on click method on div.explore-menu-list-item   and set the category using props .