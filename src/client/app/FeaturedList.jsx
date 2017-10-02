import React from 'react';
import axios from 'axios';

// class FeaturedList extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {

//     return (
//       <div>
//         Featured wishLists
//       </div>
//     );
//   }
// }

var FeaturedList = (props) => (
  <div>
   <h2> Featured Wishlists </h2> <br/>
    <div id="FL-Container">
      <section id="FL-col1">
          PRO GAMER <br/>
          game controller <br/>
          gaming headset <br/>
          gamer fuel <br/>
          gaming glasses <br/>
          gaming socks <br/>
          gaming gloves <br/>

      </section>

      <section id="FL-col2">
          I AM A CHEF <br />
          crockpot <br />
          sharp knive <br />
          mixer <br />
          souse vide <br />
          apron
      </section>

      <section id="FL-col3">
          HIPSTER WRITER <br/>
          Vegan tote bag <br/>
          fair trade coffee <br/>
          macbook stickers <br/>
          moleskin notebook <br/>
          hemp underwear <br/>
      </section>

      <section id="FL-col4">
         MUSCLE MANIA <br />
          protein <br />
          protein <br />
          supplements <br />
          protein <br />
      </section>

    </div>
  </div>
  )

export default FeaturedList;