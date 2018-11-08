
# Miscellaneous Notes

onConstruction  [idea]
 * parameters
 * execute functions on contruction of the
   object. Example database connection.
   Convenient to have but will make constructor more
   cluttered. Introduces asynchronus code into the constructor.


# client libraries and webpack ect. 
Lately, thinking about client development some and began formulating
an argument for not using reactjs or angularjs etc.  In many ways I 
am tired of next generation JavaScript and think it creates a sloppy project.
Sloppy meaning next generation JavaScript does not have good linting support.
Plus, it's a pain to get test 100% coverage with next generation JS.

So, why not just use current generation JavaScript for browser projects.
Example, simple event emitter combined with a good design pattern 
for handling event logic and rendering state and you can say goodbye
to next generation JS libraries for browser logic. Plus, say hello
to lab and a clean light weight testing framework for 100% coverage. 
Just need to assure what your target browsers are. hmmm

Advantages of NextGenerationJS
* internal event emitter and rendering of modules.
* diff recoginition and re-render when changes are made.
* cool inline styles with libraries like emotion.
* have react's style of programming as a skeloton for browser logic.


Disadvantages of NextGenerationJS
* massive amount of dependencies.
  jest testing includes over three hundred packages.
  And, there is still no linting, style guide, test coverage
  reports (??). I think Jest does have coverage reports.
* compilation of next generation JavaScript
  browserify, webpack, or rollup.
  Puts a layer between your browser code and the web browswer.
  Plus, adds many dependencies to the project.
* Leaves my preference of light weight libraries and fewer dependencies.
  For example, lab.
  
