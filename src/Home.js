import React, { useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateValue } from "./StateProvider";

const promoImages = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/SamsungM/Family/M31prime/GW_9thOCT/V259540125_IN_WLME_SamsungM31Prime_DesktopTallHero_1500x600_1._CB418517175_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/jupiter20/teaser2/GW/6-Desktop-Hero1x_English_3000x1200n._CB403509617_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img17/Home/LA/CBCC_PC_hero/3_BAU_CBCC_HeroPC_1500x600._CB403630975_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonDevices/GW/Introduction._CB403669933_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img19/Luggage/Dec/WRS/GW_PC_BUNK_1500x600._CB418522199_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/vgsw2020/Chetanbhagat_1500x600_1x._CB403107293_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img20/AmazonBrands/Space/XCM_Manual_1272222_1396746_in_la_hero_oct_1500x600_in-en_951a7c53-c507-4ee1-8123-74efb8de6344._CB418528541_.jpg"
];

function Home() {
  const [{ basket }, dispatch] = useStateValue();

  const notify = (type) => {
    if (type == "success") {
      toast.success("A product has been added to your cart", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("A product has been removed from your cart", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="home">
      <ToastContainer />
      <div className="home__container">
        <Carousel
          className="home__image"
          autoPlay={true}
          showThumbs={false}
          swipeable={true}
          infiniteLoop={true}
        >
          {promoImages.map((_, index) => (
            <div key={index}>
              <img src={promoImages[index]} />
            </div>
          ))}
        </Carousel>

        <div className="home__row">
          <Product
            id="12321341"
            title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
            price={299}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
            discription="Most new businesses fail. But most of those failures are preventable. 
            The Lean Startup is a new approach to business that's being adopted around the world. It is changing the way companies are built and new products are launched. The Lean Startup is about learning what your customers really want. It's about testing your vision continuously, adapting and adjusting before it's too late. Now is the time to think Lean."
            notify={notify}
          />
          <Product
            id="49538094"
            title="HP Omen 10th Gen Intel Core i7 Processor 15.6-inch FHD Gaming Laptop "
            price={119490.0}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/71HXR1mNdYL._SL1500_.jpg"
            notify={notify}
            discription={
              <p>
                i7-10750H/16GB/1TB SSD/Windows 10/300 Nits/144 Hz/NVIDIA GTX
                1650ti 4GB/Shadow Black/2.36 kg, 15-ek0019TX 1.6GHz Intel
                i7-10750H 10th Gen processor 16GB DDR4 RAM 1TB SSD 15.6-inch
                screen, NVIDIA GeForce GTX 1650ti 4GB Graphics Windows 10 Home
                operating system 2.36kg laptop
              </p>
            }
          />
        </div>

        <div className="home__row">
          <Product
            id="4903850"
            title="Fitbit FB507BKBK Versa 2 Health & Fitness Smartwatch with Heart Rate, Music, Alexa Built-in, Sleep & Swim Tracking, Black/Carbon, One Size (S & L Bands Included) (Black/Carbon)"
            price={19275.0}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/715obo1cz0L._SL1500_.jpg"
            notify={notify}
          />
          <Product
            id="23445930"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={9749}
            rating={5}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
            notify={notify}
          />
          <Product
            id="3254354345"
            title="Apple iPad (10.2-inch, Wi-Fi, 32GB) - Space Grey (Latest Model)"
            price={29900}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/71TJA%2BsJv2L._SL1500_.jpg"
            notify={notify}
          />
        </div>

        <div className="home__row">
          <Product
            id="90829332"
            title="Samsung 34-inch (86.40cm) Curved Monitor- 21:9 Ultrawide QLED, Thunderbolt 3 Port- LC34J791WTWXXL"
            price={84100}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/91pi34PiUPL._SL1500_.jpg"
            notify={notify}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
