import ButtonInput from "../../components/atoms/ButtonInput";
import { Fly, Layer, Planner } from "../../assets";
import React from "react";
import { message } from "antd";

export const Landing: React.FC<any> = ({}) => {
  const secondSection = [
    {
      name: "Instant Campaign Deployment",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#129BFF]",
    },
    {
      name: "Third Party Campaigns",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#FF0707]",
    },
    {
      name: "Multiple Creative Optimization",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#129BFF]",
    },
    {
      name: "Campaign Monitoring",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#FF960C]",
    },
    {
      name: "Inventory Management",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#4418A4]",
    },
    {
      name: "Proof Of Play",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#B408BD]",
    },
  ];

  const thirdSection = [
    {
      color: "bg-[#6271FF]",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-users-alt flex items-center justify-center"></i>
      ),
      heading: "Sell Media On Audience Impressions",
      subHeading:
        "Discover locations frequented most by your lookalike audiences and Accurately forecast total traffic and target audience impressions.",
    },
    {
      color: "bg-[#6271FF]",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-digital-tachograph flex items-center justify-center"></i>
      ),
      heading: "Applies to both Static & PDOOH",
      subHeading:
        "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase  agreements media owners & through programmatic SSP integrations.",
    },
    {
      color: "bg-[#6271FF]",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-loan flex items-center justify-center"></i>
      ),
      heading: "Assured Business with Quaterly MGs",
      subHeading:
        "Get supplier-direct pricing adjusted with validation of actual target audience impressions. If you’re quoted a better price elsewhere, we'll match it.",
    },
  ];

  const otherProducts = [
    {
      id: 1,
      icon: <img src={Layer} alt="layer" />,
      textColor: "text-[#438061]",
      bgColor: "bg-[#F0FFEB]",
      heading: "Layer",
      subHeading: "DATA MANAGEMENT PLATFORM",
      para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
      redirect: "",
    },
    {
      id: 3,
      icon: <img src={Planner} alt="planner" />,
      textColor: "text-[#129BFF]",
      bgColor: "bg-[#EEFAFF]",
      heading: "Planner",
      subHeading: "DOOH PLANNING TOOL",
      para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
      redirect: "",
    },
  ];

  return (
    <div className="w-full h-full font-custom pt-4">
      <div className="w-full grid grid-cols-12 bg-gradient-to-b from-[#F3F5FF] to-[#FFFFFF] p-12">
        <div className="w-full col-span-8">
          <div>
            <h1
              className="pb-2 word inline-block z-10 font-custom font-semibold text-[24px] sm:text-[20px] md:text-[40px] lg:text-[60px] text-[#1E376E] 
              leading-[32px] sm:leading-[44px] md:leading-[72px] lg:leading-[90px] tracking-[-0.01rem] align-center text-start"
            >
              powerful cms solutions {<br />}for digital out-of- <br />
              home{" "}
              <span className="font-cursive font-regular tracking-[-0.3rem] text-[#4E64EE]">
                advertising
              </span>
            </h1>
            <p
              className="pb-8 text-[20px] text-start sm:text-[14px] md:text-[16px] lg:text-[16px] text-[#4C6590] mt-12 md:mt-8 
              leading-[22px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] tracking-normal"
            >
              Our Data Management Platform helps you collect, organize, and
              activate high-quality <br />
              audience data directly from real respondents—no guesswork, just
              insights that drive results.
            </p>
          </div>
          <div className="w-1/4">
            <ButtonInput
              className={"bg-[#4E64EE]"}
              // icon={<i className="fi fi-sr-megaphone flex items-center" />}
              rounded="small"
              fullWidth={true}
              onClick={() => message.info("We will give demo to You")}
            >
              Request Demo
            </ButtonInput>
          </div>
        </div>
        <div className="col-span-4 flex justify-center items-center">
          <div className="bg-[#F2F5FF] rounded-full h-[360px] w-[360px] flex justify-center items-center">
            <img src={Fly} className="h-1/2 w-1/2" alt="fly" />
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[12px] text-[#2D5087] tracking-[0.5rem] px-1 pb-2">
            TYPES OF DATA SOURCES
          </p>
          <h1 className="py-4 text-center font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
            End To End Solution <br />
            For{" "}
            <span className="font-cursive font-regular tracking-[-0.2rem] text-[#4E64EE]">
              Media Owner
            </span>
          </h1>
          <p className="text-[20px] py-4 text-[#2D5087] text-center">
            {" "}
            Respondents input their real-world demographics, interests, and
            behaviors <br />
            directly into your system.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 px-20 py-8">
          {secondSection?.map((content: any, i: any) => (
            <div
              key={i}
              className="col-span-4 rounded-[12px] border border-gray-100 p-4 flex items-center gap-2 h-[120px]"
            >
              <div className={`${content.bg} rounded-full p-4`}>
                {content.icon}
              </div>
              <h1 className="text-[24px] text-[#2A3856] font-semibold">
                {content.name}
              </h1>
            </div>
          ))}
        </div>
      </div>

      <div className="py-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[12px] text-[#2D5087] tracking-[0.5rem] px-1 pb-2">
            DEMOGRAPHIC & MOVEMENT PATTERNS
          </p>
          <h1 className="py-4 text-center font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
            Unlock New Revenue Streams <br />
            Optimize Your{" "}
            <span className="font-cursive font-regular tracking-[-0.2rem] text-[#4E64EE]">
              Occupancy
            </span>
          </h1>
          <p className="text-[20px] py-4 text-[#2D5087] text-center">
            {" "}
            Respondents input their real-world demographics, interests, and
            behaviors <br />
            directly into your system.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 px-36 py-8">
          {thirdSection?.map((content: any, i: any) => (
            <div
              key={i}
              className="col-span-4 border border-gray-100 rounded-[12px] px-4 py-8"
            >
              <div
                className={`${content.color} h-12 w-12 flex items-center justify-center rounded-full p-2`}
              >
                {content.icon}
              </div>
              <h1 className="py-4 text-[#2A3856] text-[24px] font-semibold">
                {content.heading}
              </h1>
              <p className="py-2 text-[16px] text-[#2D5087]">
                {content.subHeading}
              </p>
              <p></p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 pb-32">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[12px] text-[#2D5087] tracking-[0.5rem] px-1 pb-2">
            TYPES OF DATA SOURCES
          </p>
          <h1 className="py-4 text-center font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
            Extracting Data And Calculating <br />
            Averages For{" "}
            <span className="font-cursive font-regular tracking-[-0.2rem] text-[#4E64EE]">
              Performance Insights
            </span>
          </h1>
          <p className="text-[20px] py-4 text-[#2D5087] text-center">
            {" "}
            Respondents input their real-world demographics, interests, and{" "}
            <br />
            behaviors directly into your system.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 ml-[-15px] py-8">
          <div className="col-span-6 bg-[#F2F3FF] flex items-center justify-center mr-12">
            <img src={Fly} className="h-1/2 w-1/2" alt="fly" />
          </div>
          <div className="col-span-6 font-custom px-16">
            <h1 className="font-semibold text-[28px] md:text-[40px] leading-[42px] md:leading-[54.72px] tracking-normal">
              Advanced Programmatic Ad Deployment
            </h1>
            <p className="text-[20px] text-[#2D5087] py-4">
              Take control of your digital signage network with sophisticated
              scheduling options. Deploy content based on share-of-voice
              requirements, timezone-specific targeting, and multi-creative
              rotations. Synchronize displays across screens of varying
              dimensions for cohesive brand experiences.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 ml-[-15px] py-8">
          <div className="col-span-6 font-custom px-16">
            <h1 className="font-semibold text-[28px] md:text-[40px] leading-[42px] md:leading-[54.72px] tracking-normal">
              Comprehensive Campaign Monitoring
            </h1>
            <p className="text-[20px] text-[#2D5087] py-4">
              {
                "Track performance with precision through detailed media asset analytics. Our live log reporting gives you immediate insights into which assets are performing, when they're displaying, and how they're engaging your audience."
              }
            </p>
          </div>
          <div className="col-span-6 bg-[#F2F3FF] flex items-center justify-center ml-12">
            <img src={Fly} className="h-1/2 w-1/2" alt="fly" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 ml-[-15px] py-8">
          <div className="col-span-6 bg-[#F2F3FF] flex items-center justify-center mr-12">
            <img src={Fly} className="h-1/2 w-1/2" alt="fly" />
          </div>
          <div className="col-span-6 font-custom px-16">
            <h1 className="font-semibold text-[28px] md:text-[40px] leading-[42px] md:leading-[54.72px] tracking-normal">
              Intelligent Media Asset Management
            </h1>
            <p className="text-[20px] text-[#2D5087] py-4">
              Maintain complete visibility of your digital assets in real time.
              Monitor the status of each creative, adjust loop lengths on the
              fly, and ensure optimal performance across your entire network.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 ml-[-15px] py-8">
          <div className="col-span-6 font-custom px-16">
            <h1 className="font-semibold text-[28px] md:text-[40px] leading-[42px] md:leading-[54.72px] tracking-normal">
              Dynamic Campaign Control Center
            </h1>
            <p className="text-[20px] text-[#2D5087] py-4">
              {
                "Manage every aspect of your campaigns without delay. Play, pause, or remove campaigns instantly. Swap creative assets, adjust default campaign settings, and fine-tune your content loops—all from a single, intuitive interface"
              }
            </p>
          </div>
          <div className="col-span-6 bg-[#F2F3FF] flex items-center justify-center ml-12">
            <img src={Fly} className="h-1/2 w-1/2" alt="fly" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 ml-[-15px] py-8">
          <div className="col-span-6 bg-[#F2F3FF] flex items-center justify-center mr-12">
            <img src={Fly} className="h-1/2 w-1/2" alt="fly" />
          </div>
          <div className="col-span-6 font-custom px-16">
            <h1 className="font-semibold text-[28px] md:text-[40px] leading-[42px] md:leading-[54.72px] tracking-normal">
              AI-Powered Ad Delivery Optimization
            </h1>
            <p className="text-[20px] text-[#2D5087] py-4">
              Let our intelligent algorithms maximize your display
              effectiveness. Our system continuously analyzes performance data
              to recommend optimal placement, timing, and creative combinations
              for superior audience engagement. Streamline your DOOH operations
              with our enterprise-grade CMS platform—built for media owners who
              demand reliability, flexibility, and results.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-4 px-16 py-8">
        <div className="col-span-4">
          <h1 className="py-4 text-start font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
            See Our Other{" "}
            <span className="font-cursive font-regular tracking-[-0.2rem] text-[#4E64EE]">
              Products
            </span>
          </h1>
          <p className="text-[20px] py-4 text-[#2D5087] text-start">
            find out how our user are spreading the word
          </p>
        </div>
        <div className="col-span-6 grid grid-cols-12 gap-4">
          {otherProducts?.map((product: any) => (
            <div
              key={product.id}
              className={`${product.bgColor} col-span-6 w-full rounded-[12px] shadow-sm border border-gray-100 p-8 hover:shadow-xl`}
            >
              {product.icon}
              <h1 className="my-4 text-[24px] text-[#2A3856] font-semibold">
                {product.heading}
              </h1>
              <h1 className="my-4 text-[16px] text-[#2A3856]">
                {product.subHeading}
              </h1>
              <p className="my-2 text-[16px] text-[#2D5087]">{product.para}</p>
              <div className="pt-4">
                <button
                  onClick={() => window.open(product.redirect)}
                  className={`${product.textColor} bg-[#FFFFFF] ${product.hoverBg} ${product.hoverText} py-2 w-[50%] rounded-full flex justify-center font-semibold text-[16px]`}
                >
                  <div className="flex gap-2 items-center">
                    <p>Know More</p>
                    <i
                      className={`fi fi-br-arrow-up-right flex items-center`}
                    />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
