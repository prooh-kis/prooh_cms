import { dmpURL, planningURL } from "../../constants/urlConstants";
import { Fly, Layer, Planner } from "../../assets";
import ButtonInput from "../../components/atoms/ButtonInput";
import React from "react";

export const Landing: React.FC<any> = ({}) => {
  const secondSection = [
    {
      name: "Camera Data",
      para: "Data Source-Qvidi",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#FF0707]",
    },
    {
      name: "Roadster Data",
      para: "Data Source-",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#FF960C]",
    },
    {
      name: "Mobile Device SDK Data",
      para: "Data Source-Google",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#4418A4]",
    },
    {
      name: "As Per Property Management",
      para: "Data Source-Dfmd",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#2A9860]",
    },
    {
      name: "google Traffic And RTO Data",
      para: "Data Source-Google",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#129BFF]",
    },
  ];

  const thirdSection = [
    {
      color: "bg-[#3A9868]",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-users-alt flex items-center justify-center"></i>
      ),
      heading: "Time Zone",
      subHeading:
        "Respondents input their real-world demographics, interests, and behaviors directly into your system.",
    },
    {
      color: "bg-[#3A9868]",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-digital-tachograph flex items-center justify-center"></i>
      ),
      heading: "T1, T2, T3, T4",
      subHeading:
        "Respondents input their real-world demographics, interests, and behaviors directly into your system.",
    },
    {
      color: "bg-[#3A9868]",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-loan flex items-center justify-center"></i>
      ),
      heading: "Weekdays/Weekend Ratio",
      subHeading:
        "Respondents input their real-world demographics, interests, and behaviors directly into your system.",
    },
  ];

  const otherProducts = [
    {
      id: 2,
      icon: <img src={Fly} alt="fly" />,
      textColor: "text-[#4E64EE]",
      bgColor: "bg-[#F2F4FF]",
      heading: "Fly",
      subHeading: "CONTENT MANAGEMENT SYSTEM",
      para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
      redirect: { planningURL },
    },
    {
      id: 3,
      icon: <img src={Planner} alt="planner" />,
      textColor: "text-[#129BFF]",
      bgColor: "bg-[#EEFAFF]",
      heading: "Planner",
      subHeading: "DOOH PLANNING TOOL",
      para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
      redirect: { dmpURL },
    },
  ];

  return (
    <div className="w-full h-full font-custom px-4">
      <div className="w-full grid grid-cols-12 bg-gradient-to-b from-[#F6FFFA] to-[#FFFFFF] p-12">
        <div className="w-full col-span-8">
          <div>
            <h1
              className="pb-2 word inline-block z-10 font-custom font-semibold text-[24px] sm:text-[20px] md:text-[40px] lg:text-[60px] text-[#1E376E] 
              leading-[32px] sm:leading-[44px] md:leading-[72px] lg:leading-[90px] tracking-[-0.01rem] align-center text-start"
            >
              collect, organize, {<br />}activate, all your{" "}
              <span className="font-cursive font-regular tracking-[-0.3rem] text-[#2A9860]">
                audience
              </span>
              <br />
              data in one place
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
              className={"bg-[#2A9860]"}
              // icon={<i className="fi fi-sr-megaphone flex items-center" />}
              rounded="small"
              fullWidth={true}
              onClick={() => window.open(dmpURL)}
            >
              Get Started
            </ButtonInput>
          </div>
        </div>
        <div className="col-span-4 flex justify-center items-center">
          <div className="bg-[#EEFFF5] rounded-full h-[360px] w-[360px] flex justify-center items-center">
            <img src={Layer} className="h-1/2 w-1/2" alt="fly" />
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[12px] text-[#2D5087] tracking-[0.5rem] px-1 pb-2">
            TYPES OF DATA SOURCES
          </p>
          <h1 className="py-4 text-center font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
            Extracting Data And Calculating <br />
            Averages For{" "}
            <span className="font-cursive font-regular tracking-[-0.2rem] text-[#3A9868]">
              Performance Insights
            </span>
          </h1>
          <p className="text-[20px] py-4 text-[#2D5087] text-center">
            Respondents input their real-world demographics, interests, and
            <br />
            behaviors directly into your system.
          </p>
        </div>
        <div
          className={`${
            secondSection?.length >= 3
              ? "grid grid-cols-12"
              : "flex justify-center"
          } gap-4 px-20 py-8 items-center`}
        >
          {secondSection?.map((content: any, i: any) => (
            <div
              key={i}
              className={`${
                secondSection.length >= 3 ? "col-span-4" : "w-1/3"
              } rounded-[12px] border border-gray-100 p-4 flex items-center gap-2 h-[120px]`}
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
            Unlock With Demographic
            <br />
            And Movement{" "}
            <span className="font-cursive font-regular tracking-[-0.2rem] text-[#3A9868]">
              Analysis
            </span>
          </h1>
          <p className="text-[20px] py-4 text-[#2D5087] text-center">
            {" "}
            Respondents input their real-world demographics, interests, and
            behaviors directly into your system.
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

      <div className="py-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="py-4 text-center font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
            Impact Factors On Visit{" "}
            <span className="font-cursive font-regular tracking-[-0.2rem] text-[#3A9868]">
              Patterns
            </span>
          </h1>
          <p className="text-[20px] py-4 text-[#2D5087] text-center">
            find out how our user are spreading the word
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 px-36 py-8"></div>
      </div>

      <div className="py-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="py-4 text-center font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
            Our Data Heroes{" "}
            <span className="font-cursive font-regular tracking-[-0.2rem] text-[#3A9868]">
              Factors
            </span>
          </h1>
          <p className="text-[20px] py-4 text-[#2D5087] text-center">
            find out how our user are spreading the word
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 px-36 py-8"></div>
      </div>

      <div className="grid grid-cols-10 gap-4 px-16 py-8">
        <div className="col-span-4">
          <h1 className="py-4 text-start font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
            See Our Other{" "}
            <span className="font-cursive font-regular tracking-[-0.2rem] text-[#3A9868]">
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
              className={`${product.bgColor} col-span-6 w-full rounded-[12px] shadow-sm border border-gray-100 p-8`}
            >
              {product.icon}
              <h1 className="my-4 text-[24px] text-[#2A3856] font-semibold">
                {product.heading}
              </h1>
              <h1 className="my-4 text-[16px] text-[#2A3856]">
                {product.subHeading}
              </h1>
              <p className="my-2 text-[16px] text-[#2D5087]">{product.para}</p>
              <div className={`pt-4 `}>
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
