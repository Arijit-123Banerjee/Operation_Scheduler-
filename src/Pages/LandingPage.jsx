import React from "react";
import CustomButton from "../Components/CustomButton";
import { Link } from "react-router-dom";
import Header from "../Components/Header";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div>
        <section>
          <div className="relative pt-12 background_svg sm:pt-16 lg:py-36 xl:py-48">
            <div className="absolute inset-0 hidden lg:block">
              <img
                className="object-contain object-right w-full h-full"
                src="https://static.vecteezy.com/system/resources/previews/036/094/204/original/ai-generated-doctor-asia-woman-arms-crossed-with-smile-pride-on-transparent-background-free-png.png"
                alt="Doctor"
              />
            </div>

            <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div className="max-w-lg mx-auto text-center lg:mx-0 lg:max-w-md lg:text-left">
                <p className="text-base font-bold text-gray-600">
                  Streamline your operations with our advanced scheduling
                  system.
                </p>
                <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:mt-8 sm:text-5xl xl:text-6xl">
                  Streamline your medical appointments
                </h1>

                <div className="mt-8 sm:mt-12">
                  <Link to={"/signup"}>
                    <CustomButton>Get Started</CustomButton>
                  </Link>
                </div>
              </div>

              <div className="mt-8 lg:hidden">
                <img
                  className="object-cover size-[60vh]"
                  src="https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png"
                  alt="Doctor"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
