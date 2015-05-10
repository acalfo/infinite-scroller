INSTALLATION INSTRUCTIONS:

1) git pull or clone the repo

2) in cmd prompt, nagivate to root of the project folder

3) Run the following commands

      A) npm install
      
          -note if your running linux/mac you'll need to do 'sudo npm install'
          
      B) bower install
      
To test the application run from project root:

npm test

To start the application up, run from project root:

npm start

  Then navigate to localhost:3000 in your browser
  

The Bi-Directional Scroll directive takes in as an attr the following parameters:

1) 'bottom-trigger'

      The function to run when the scroll event has reached the bottom threshold
      
      Usage: bottom-trigger="test()"
      
        The function 'test' will be run when scrolling down past the configured threshold

2) 'top-trigger'

      The function to run when the scroll event has reached the top threshold
      
      Usage: top-trigger="test"
      
        The function 'test' will be run when scrolling up past the configured threshold

3) 'scroll-distance'

    Scroll Distance allows one to configure the threshold for the trigger functions
    
      *is the number of window heights required before triggering the threshold
    
        Usage: A value of 1 would trigger a bottom-scroll event when the window 
    
               position has scrolled down past 1 window length from the bottom
               
Example Usage: 

<div ng-super-scroller bottom-trigger="test()" top-trigger="test()" scroll-distance="5"></div>


Adding/Removing rows is configured from the 'Contact' Service.

Contact Service Configuration options:

  1. Total Size:

    The number of rows to fetch from 3rd party api (randomusers.me)
    
  2. View Size:

    The maximum number of rows on the DOM at a single time 

      --Creates a 'Sliding Window' effect
  
  3. Load Size:
  
    The number of rows to remove/add when trigger functions called from scroller
    
  4. Row Class Name
  
    The class name of each of the rows to scroll through. This is needed in order to 

    compute the height of each element in order to apply it to surrounding placeholder divs
    
Smooth Scrolling when rows added/removed is achieved by placing 2 placeholder divs 

  - ng-super-scroller-before

  - ng-super-scroller-after

  Before/After the super-scroller's DOM Element.
  

  When adding/removing rows, each row element's height (found from 'rowClassName') is applied 
  
  to surrounding divs to create a padding effect that allows for unlimited scrolling without 
  
  changing the user's natural scrolling experience.
