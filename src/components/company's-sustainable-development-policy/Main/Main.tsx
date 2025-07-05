import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { useTranslations } from 'next-intl';
import React from 'react';

export const Main = () => {
  const t = useTranslations();

  return (
    <section className="container py-[150px] max-[550px]:py-[100px]">
      <Breadcrumbs />
      <div className="flex flex-col w-full gap-5 pt-[30px]">
        <h1 className="text-[56px] font-semibold max-[1024px]:text-[35px] max-[550px]:text-[24px] font-title">
          {t("company's-sustainable-development-policy.title")}
        </h1>
        <p className="text-[20px] font-semibold max-[768px]:text-[18px]  ">
          {t("company's-sustainable-development-policy.sub_title")}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px] ">
          {t("company's-sustainable-development-policy.text")}
        </p>
        <p className="text-[20px] font-semibold [@media(max-width:768px)]:text-[18px]">
          {t("company's-sustainable-development-policy.sub_title2")}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px] ">
          {t("company's-sustainable-development-policy.text2")}
        </p>
        <ul className=" list-disc px-[30px] text-[18px] [@media(max-width:768px)]:text-[14px]">
          {t.raw("company's-sustainable-development-policy.list").map((el: { li: string }) => (
            <li key={el.li}>{el.li}</li>
          ))}
        </ul>
        <p className="text-[20px] font-semibold [@media(max-width:768px)]:text-[18px]">
          {t("company's-sustainable-development-policy.sub_title3")}
        </p>
        <ul className=" list-disc px-[30px] text-[18px] [@media(max-width:768px)]:text-[14px]">
          {t.raw("company's-sustainable-development-policy.list2").map((el: { li: string }) => (
            <li key={el.li}>{el.li}</li>
          ))}
        </ul>
        <p className="text-[20px] font-semibold [@media(max-width:768px)]:text-[18px]">
          {t("company's-sustainable-development-policy.sub_title4")}
        </p>
        <ul className=" list-disc px-[30px] text-[18px] [@media(max-width:768px)]:text-[14px]">
          {t.raw("company's-sustainable-development-policy.list3").map((el: { li: string }) => (
            <li key={el.li}>{el.li}</li>
          ))}
        </ul>
        <p className="text-[20px] font-semibold [@media(max-width:768px)]:text-[18px]">
          {t("company's-sustainable-development-policy.sub_title5")}
        </p>
        <ul className=" list-disc px-[30px] text-[18px] [@media(max-width:768px)]:text-[14px]">
          {t.raw("company's-sustainable-development-policy.list4").map((el: { li: string }) => (
            <li key={el.li}>{el.li}</li>
          ))}
        </ul>
        <p className="text-[20px] font-semibold [@media(max-width:768px)]:text-[18px]">
          {t("company's-sustainable-development-policy.sub_title6")}
        </p>
        <ul className=" list-disc px-[30px] text-[18px] [@media(max-width:768px)]:text-[14px]">
          {t.raw("company's-sustainable-development-policy.list5").map((el: { li: string }) => (
            <li key={el.li}>{el.li}</li>
          ))}
        </ul>
        <p className="text-[20px] font-semibold [@media(max-width:768px)]:text-[18px]">
          {t("company's-sustainable-development-policy.sub_title7")}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px] ">
          {t("company's-sustainable-development-policy.text3")}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px] ">
          {t("company's-sustainable-development-policy.text4")}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px] ">
          {t("company's-sustainable-development-policy.text5")}
        </p>
        <p className="text-[20px] font-semibold [@media(max-width:768px)]:text-[18px]">
          {t("company's-sustainable-development-policy.sub_title8")}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px] ">
          <span>{t("company's-sustainable-development-policy.text6")}</span>
          <span>{t("company's-sustainable-development-policy.text7")}</span>
          <span>{t("company's-sustainable-development-policy.text8")}</span>
        </p>
        <p className="text-[20px] font-semibold [@media(max-width:768px)]:text-[18px]">
          {t("company's-sustainable-development-policy.sub_title10")}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px] ">
          {t("company's-sustainable-development-policy.text9")}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px] ">
          {t("company's-sustainable-development-policy.text10")}
        </p>
        <ul className=" list-disc px-[30px] text-[18px] [@media(max-width:768px)]:text-[14px]">
          {t.raw("company's-sustainable-development-policy.list6").map((el: { li: string }) => (
            <li key={el.li}>{el.li}</li>
          ))}
        </ul>
        <p className="text-[18px] max-[768px]:text-[14px] ">
          {t("company's-sustainable-development-policy.text11")}
        </p>
        <ul className=" list-disc px-[30px] text-[18px] [@media(max-width:768px)]:text-[14px]">
          {t.raw("company's-sustainable-development-policy.list7").map((el: { li: string }) => (
            <li key={el.li}>{el.li}</li>
          ))}
        </ul>
        <p className="text-[20px] font-semibold [@media(max-width:768px)]:text-[18px]">
          {t("company's-sustainable-development-policy.sub_title11")}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px] ">
          {t("company's-sustainable-development-policy.text12")}
        </p>
      </div>
    </section>
  );
};
