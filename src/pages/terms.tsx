import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import PageHeroSection from "@components/ui/page-hero-section";
import { termsAndServices } from "@settings/terms-settings";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import DownloadApps from "@components/common/download-apps";
import Heading from "@components/ui/heading";
import Seo from "@components/seo/seo";

export default function TermsPage() {
  const { t } = useTranslation("terms");
  return (
    <>
      <Seo
        title="Terms & conditions"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="terms"
      />
      <PageHeroSection heroTitle="text-page-terms-condition" />
      <div className="py-12 lg:py-16 2xl:py-20">
        <Container>
          <div className="w-full xl:max-w-[1200px] mx-auto">
            <div className="cbx-container">

              <div className="container">
                <div className="mt-8">
                  <div className="col-md-12">
                    <div className="contact-title">
                      <h3 className="text-2xl font-bold">Terms And Conditions</h3>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="col-md-12">
                    <p className="mt-4" >
                      These Terms and Conditions (“Terms”) apply to all websites, services, software, and mobile applications provided by Offer Zone (“Offer Zone”, “we” or “our”), including the website www.offerzonebd.com. The website and mobile application together are hereinafter referred to as “Website”.

                      Offer Zone is a business entity which provides lifestyle facilities and consumer marketing (hereinafter referred to as “Services”) to its clients (hereinafter referred to as “User” and collectively referred to as “Users”) such as premium services, special privileges, discounted price or special offers at restaurants, gym, hotels, resorts, spas, entertainment places, lifestyle brands or other consumer-related products by partnering with these companies or entities.

                      Upon usage of this website, the user agrees to the Terms and Conditions as mentioned in this document.
                    </p>

                  </div>
                </div>
                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl  font-bold">Article 1: General</h5>
                    <p className="mt-4" >
                      1.1 Partner entities are the entities with whom Offer Zone will enter into an agreement to provide special offers or Services to the Users of Offer Zone’s Website (hereinafter referred to as “Partner” and collectively referred to as “Partners”). Services, offers, promotional materials or any other content provided by Offer Zone to be displayed on the Website is hereinafter referred to as “Contents”.
                      <br className="mt-2 block" />
                      1.2 Partner will be solely responsible for their respective contents being displayed on the Website.
                      <br className="mt-2 block" />
                      1.3 Partner guarantees that their Contents do not violate any copyright, intellectual property rights or other rights of any person or entity, and agrees to release Offer Zone from all obligations, liabilities and claims arising in connection with the use of (or the inability to use) the Services offered by the Partners.
                      <br className="mt-2 block" />
                      1.4 The Partners grant Offer Zone the permission to publish and modify their content on the Website.

                    </p>

                  </div>
                </div>

                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl  font-bold">Article 2: Copyright</h5>
                    <p className="mt-4" >
                      2.1 Partners grant Offer Zone a perpetual, Offer Zone-free, irrevocable, non-exclusive right and license to use, reproduce, modify, adapt, publish, translate, create derivative works from and distribute such Contents or incorporate such Contents into any form, medium, or technology now known or later developed.
                      <br className="mt-2 block" />
                      2.2 The material (including the Contents, and any other content, software or services) contained on the Website are the property of Offer Zone, its subsidiaries, affiliates and/or third party licensors. Any intellectual property rights, such as copyright, trademarks, service marks, trade names and other distinguishing brands on the Website are the property of Offer Zone. In other words, no material on this site may be copied, reproduced, republished, installed, posted, transmitted, stored or distributed without written permission from Offer Zone.

                    </p>

                  </div>
                </div>

                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl font-bold">Article 3: Security and Personal Information</h5>
                    <p className="mt-4" >
                      3.1 Offer Zone reserves the authority to transfer User or Partner information to government security agents and relevant Government regulator in issue of a trial, a security concern raised by any security agency of the government of Bangladesh or for any regulatory compliance that might compel Offer Zone to release User or Partner information.
                    </p>

                  </div>
                </div>

                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl  font-bold">Article 4: Offer Zone Membership</h5>
                    <p className="mt-4" >
                      4.1 As a member of the Offer Zone Gold Membership, you will be issued a membership subscription plan (“Offer Zone Gold Membership”). You will also get membership information on your smartphone device which supports Android or iOS, by downloading Offer Zone mobile application from your App Store or Play Store and signing up. You are responsible for the costs involved in installing and using the Offer Zone mobile application on your mobile device. Please ensure to upload your authentic photo on the Offer Zone platform to be able to use the service from Offer Zone.
                      <br className="mt-2 block" />
                      4.2 By using your Offer Zone Membership in any of the Offer Zone's partner outlets or for online purchase, you automatically provide acceptance of the Offer Zone Membership along with its rules, terms, and conditions which are subject to amendment from time to time.
                      <br className="mt-2 block" />
                      4.3 Offer Zone reserves the right to modify or close the Offer Zone Membership, or to change, cancel or withdraw any of the terms and conditions, without assigning any reasons whatsoever at any point of time at its own discretion. It reserves the right to discontinue Offer Zone Memberships - existing or new – permanently or temporarily. The participating outlets and Offer Zone Partners may also change from time to time, at the discretion of Offer Zone. Offer Zone will use reasonable efforts to include up-to-date and accurate information on the website: www.offerzonebd.com for any such change, cancellation, addition, withdrawal or modification. It is your responsibility to carefully read, agree with and accept these terms and conditions. Your continuance as a member shall signify your acceptance to be bound by the latest terms and conditions applicable from time to time. If you do not agree to (or cannot comply with) any of the terms and conditions, we encourage you to surrender/withdraw your membership.
                      <br className="mt-2 block" />
                      4.4 Benefits and offers made to you through the Offer Zone Membership may change or be withdrawn without prior intimation. Offer Zone will not be responsible for any liability arising from such situations.
                      <br className="mt-2 block" />
                      4.5 You are responsible for notifying the Offer Zone Support team of any change in your contact details.
                      <br className="mt-2 block" />
                      4.6 Cancellation:
                      You can cancel or discontinue your Offer Zone Membership at any time by e-mailing us to our support.
                      <br className="mt-2 block" />
                      <b>No Refund Policy:</b>
                      REFUNDS WILL NOT BE PROVIDED FOR ANY SUBSCRIPTION. WE DO NOT PROVIDE CREDIT, REFUNDS. In such a circumstance, you will continue to have access to your Subscription until the end of your expiration date. You will be automatically downgraded to "Guest" member once the Offer Zone Gold Subscription expires.
                      <br className="mt-2 block" />
                      4.7 Offer Zone will not be liable for any unlawful or misuse of your Offer Zone Membership, and it is your responsibility to ensure that your Offer Zone Membership Materials or Credentials are kept safe and secure at all times.
                      <br className="mt-2 block" /> 4.8 As a member you are responsible for any loss, damage or theft of your Offer Zone Membership Materials (including but not limited to the loss of your mobile phone containing your Offer Zone mobile application). You must report any loss, damage or theft immediately to the Offer Zone Support Team. Replacement Offer Zone Membership number that are issued for any reason whatsoever will have a new membership number and it might take up to 1-2 working days.
                      <br className="mt-2 block" /> 4.9 Any loss of Offer Zone Membership Identity (User Membership Number) or misuse of Offer Zone Membership Identity shall be your sole responsibility and Offer Zone will not be held responsible. The loss should be advised immediately through the Offer Zone Support Team and the lost Identity will be suspended within 1-2 working days of receipt of such a request to prevent any fraudulent use. A new Offer Zone Membership Identity will be issued to you to prevent any fraudulent use of the previous membership.
                      <br className="mt-2 block" />
                      4.10 If benefits, facilities or arrangements are provided or made available to a member as a result of his/her membership, whether these are provided by Offer Zone or by Offer Zone Partners, such a member will be personally liable for any and all costs, taxes, surcharges, fees, charges, claims or liabilities of whatever nature arising from the provision or availability of such benefits, facilities or arrangements.
                      <br className="mt-2 block" />
                      4.11 For security reasons, only your personal mobile number can be registered in your account and using mobile numbers that belong to someone else is not permissible. Your Offer Zone account can only have one phone number attached to it. To ensure you receive communication from Offer Zone, an accurate and up-to-date personal mobile number and E-mail address is required at all times.
                      <br className="mt-2 block" />
                      4.12 By enrolling in the Offer Zone Membership, you unconditionally grant your consent to Offer Zone to collect, retain, use and disclose information contained in the Offer Zone Membership Application form or otherwise provided to Offer Zone or Offer Zone Partners pursuant to the Offer Zone Membership and your other personal information including but not limited to your name, E-mail address, address, contact number, date of birth and transaction details etc. for the following purposes:
                    </p>
                    <ul>
                      <li>
                        To ensure the efficient running of the Offer Zone Membership

                      </li>
                      <li>
                        To provide information about the Offer Zone Membership

                      </li>
                      <li>
                        To develop/offer new products and services

                      </li>
                      <li>
                        For accounting and audit purposes

                      </li>
                      <li>
                        For marketing, market research and analysis purposes

                      </li>
                      <li>
                        To be disclosed as required by law

                      </li>
                      <li>
                        To send you communications (or to contact you) about promotions, services, products and facilities offered by Offer Zone or Offer Zone Partners

                      </li>
                      <li>
                        To assist in the planning, development, and implementation of the Offer Zone Membership

                      </li>
                      <li>
                        To disclose and share with Offer Zone Partners and permit them to use and/or retain it for any of the aforesaid purposes, including directly contacting you strictly with respect to the Offer Zone Membership.

                      </li>
                    </ul>
                    <p className="mt-4" >
                      4.13 While Offer Zone will endeavor to ensure that the services, benefits, facilities, and arrangements as expressed or advertised by Offer Zone and the Offer Zone Partners will be available to the members, Offer Zone will not be liable for any loss or damage, whether direct or indirect, arising from the provision or non-provision, whether whole or part, of any such services, benefits, facilities or arrangements.
                      <br className="mt-2 block" />
                      4.14 Offer Zone shall not be liable for any loss or damage, whether direct or indirect, resulting from termination or change of, either the Offer Zone Membership or any of the facilities, benefits or arrangements which are made available to members, including, without limitation, Offer Zone Partners' withdrawal or the withdrawal or limiting of any such services, benefits or facilities.
                    </p>


                  </div>
                </div>

                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl  font-bold">Article 5: Memberships and Disclaimer</h5>
                    <p className="mt-4" >
                      5.1 The Offer Zone Membership Identity shall always remain the property of the Offer Zone and you will only be the custodian of the same.
                      <br className="mt-2 block" />
                      5.2 Offer Zone reserves the right to modify or change User packages, including the price and the Contents of the Services provided to the Users.
                      <br className="mt-2 block" />
                      5.3 Activities of the Users and Partners in relation to the Website have to be in line with the business policies of Offer Zone.
                      <br className="mt-2 block" />
                      5.4 Your Offer Zone Membership can be revoked or refused without notice if you are involved in any act of fraud, shoplifting, cheating with or without cause. The membership can also be revoked if you are found to be involved in any sort of misuse of the Offer Zone Membership. In this given scenario all your existing Offer Zone Credits on the Offer Zone Membership Account shall also stand canceled and cannot be withdrawn.
                      <br className="mt-2 block" />
                      5.5 Members should ensure they put their authentic information to ensure protection from fraud.
                      <br className="mt-2 block" />
                      5.6 The Membership will be allotted purely at the discretion of the management and final decisions on all matters relating to the Offer Zone Membership shall rest with Offer Zone.
                      <br className="mt-2 block" />
                      5.7 A member who has completed their purchased time period will be updated to the option to renew their membership to avail the membership again. If the member forgets to renew his/her membership, the membership will become inactive and guest user unless he or she renews the membership.
                      <br className="mt-2 block" />
                      5.8 A member shall at all times hold only one valid Offer Zone Membership under his name. If found otherwise, Offer Zone reserves the right to cancel all Offer Zone Membership Accounts held by the Person in his name and the Offer Zone Credits accrued in such accounts cannot be withdrawn.
                      <br className="mt-2 block" />
                      5.9 Offer Zone is not obligated to refund money or provide any damages if a User is barred from using Offer Zone’s Services for any reason.
                      <br className="mt-2 block" />
                      5.10 Offer Zone holds the right to revoke the right of any User from using the Website and Services offered by its Partners.
                      <br className="mt-2 block" />
                      5.11 Offer Zone is not liable for any injury, claim, liability or damages arising out of, any error or omission on the Website or any of the third party links accessed through the Website.
                      <br className="mt-2 block" />
                      5.12 Offer Zone reserves the right to change the membership prices at anytime.
                      <br className="mt-2 block" />
                      5.13 Offer Zone reserves the right to withdraw or cancel any or all of the Offer Zone Membership Accounts issued; refuse to award Credits; refuse the right to withdraw Offer Zone Credits collected for any breach of these conditions or failure to pay for the purchases without prior notice.
                      <br className="mt-2 block" />
                      5.14 Offer Zone has the right to modify the manner in which Offer Zone Credits are earned and withdrawn, including the number of Offer Zone Credit earned and the value of these Offer Zone reward Credits, and will endeavor to notify you of any changes in advance.
                      <br className="mt-2 block" />
                      5.15 When a member seeks to use or obtain any of the services, benefits, facilities or arrangements offered, the provision of such services, benefits, facilities or arrangements will be subject to the respective terms and conditions of the provider of said benefits, facilities or arrangements.
                      <br className="mt-2 block" />
                      5.16 Offer Zone reserves the right to terminate any account with fake name or information.
                      <br className="mt-2 block" />
                      The terms and conditions as published on the Offer Zone website: www.offer zonebd.com subject to amendment, shall be final, binding and supersede the terms and conditions herein and other information as provided in relation to the Offer Zone Membership.


                    </p>

                  </div>
                </div>

                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl  font-bold">Article 6: Indemnification</h5>
                    <p className="mt-4" >
                      6.1 Partners and Users agree to indemnify Offer Zone as well as its officers, authorized representatives, employees, agents, from and against all losses, expenses, damages and costs, including attorney's fees, resulting from any violation of this Terms and Conditions (including negligent or wrongful conduct).
                    </p>

                  </div>
                </div>

                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl  font-bold">Article 7: Privacy</h5>
                    <p className="mt-4" >
                      7.1 Offer Zone will collect information from Users and Partners. It is a condition of use of Offer Zone that each User and Partner consents and authorizes Offer Zone to collect and use this information. Offer Zone also reserves the right to disclose it to any other person for the purposes of administering, supporting and maintaining Offer Zone, as well as for improving the Website, for example by using the information for research, marketing, product development and planning.
                    </p>

                  </div>
                </div>

                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl  font-bold">Article 8: Cookies</h5>
                    <p className="mt-4" >
                      8.1 The Website uses cookies, which means that you must have cookies enabled on your computer in order for all functionality on this site to work properly. A cookie is a small data file that is written to your hard drive when you visit certain Web sites. Cookie files contain certain information, such as a random number user ID that the site assigns to a visitor to track the pages visited. A cookie cannot read data off your hard disk or read cookie files created by other sites. Cookies, by themselves, cannot be used to find out the identity of any user.
                    </p>

                  </div>
                </div>


                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl  font-bold">Article 9: Offer Validity and Disclaimer</h5>
                    <p className="mt-4" >
                      9.1 All offers, discounts and services that are provided to the members of Offer Zone are subject to a specific period of time as will be mentioned in the offer package.
                      <br className="mt-2 block" />
                      9.2 Offer Zone reserves the right to cancel any discount program agreement with any of the discount Partners without any prior notification to its members or customers.
                    </p>

                  </div>
                </div>

                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl  font-bold">Article 10: Customer Ratings & Reviews</h5>
                    <p className="mt-4" >
                      10.1 We encourage you to be upfront and honest in your self-review. Your review should be Honest, Relevant, and Appropriate.
                    </p>

                  </div>
                </div>


                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl  font-bold">Article 11: Reward and Withdrawn Credits</h5>
                    <p className="mt-4" >
                      11.1 As a member/merchant/agent, you will earn Offer Zone Credits which will be shown in “Show Balance” tab.
                      You will receive the amount from Offer Zone though your desired Mobile Financial Service (MFS) or Banking channel in a particular payment cycle. Applicable charges for transferring the amount shall be borne by you. You can use the amount by your own.
                      <br className="mt-2 block" />
                      11.2 Your aforesaid consent will continue in effect unless you withdraw the consent by notice in writing to Offer Zone Support Team. Withdrawal of consent may mean that certain services may no longer be provided to you, and also entitles Offer Zone to terminate your membership at its sole option.
                    </p>

                    <p className="mt-4" >
                      Offer Zone reserves the right to modify, cancel or withdraw the terms and conditions at any point of time at Offer Zone’s own discretion, which includes the right to withdraw or cancel any or all of the Offer Zone Membership Accounts issued, refuse to award Credits, refuse the right to withdraw credits collected for any breach of these conditions or failure to pay for the purchases without prior notice.
                    </p>

                  </div>
                </div>




                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl  font-bold">Article 12: Referral Credits and Offer Zone rewards</h5>
                    <p className="mt-4" >
                      The terms and conditions (“Terms”) apply to Offer Zone’s Refer FnF program (“Program”). By referring FnF,
                      acting on a referral, using the Program, or otherwise participating in the program, the referring person
                      or Referrer (“Referrer”) and/or the referred person or Referee (“Referee”) agree to be bound by these Terms:
                      <br className="mt-2 block" />
                      12.1 The person referring is termed as Referrer and the person being referred is termed as Referee.
                      <br className="mt-2 block" />
                      12.2 If you are eligible for the refer FnF Program, you will see the refer details under the user account
                      of Offer Zone platform
                      <br className="mt-2 block" />
                      12.3 Referring customers will receive Offer Zone Reward associated with the Refer FnF Program they are
                      eligible for, only if they are registered in the gold membership plan.
                      <br className="mt-2 block" />
                      12.4 Offer Zone serves the right to change the referral Credits, Offer Zone rewards.

                    </p>

                  </div>
                </div>




                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl  font-bold">Article 13: Returns Policy</h5>
                    <p className="mt-4" >
                      If your product is defective / damaged or incorrect / incomplete at the time of delivery, please contact us
                      within the applicable return window. Your product may be eligible for refund or replacement depending on the
                      product category and condition.
                      <br className="mt-2 block" />
                      <b>Valid Reasons to Return an item</b>
                      <br className="mt-2 block" />
                      13.1 Delivered Product is damaged (physically destroyed or broken) / defective (dead on arrival)
                      <br className="mt-2 block" />
                      13.2 Delivered Product is incorrect (presentation different on website) / incomplete (missing parts)
                      <br className="mt-2 block" />
                      <b>Conditions for Returns</b>
                      <br className="mt-2 block" />
                      13.3 The product must be unused, unworn, unwashed and without any flaws <br className="mt-2 block" />
                      13.4 The product must include the original tags, user manual, warranty cards, freebies and accessories <br className="mt-2 block" />
                      13.5 The product must be returned in the original and undamaged manufacturer packaging / box.
                    </p>

                  </div>
                </div>

                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl  font-bold">Article 14: Cancellation and Refund Policy</h5>
                    <p className="mt-4" >
                      14.1 Cancellation: You may cancel your order at no cost any time before the item is dispatched to you.
                      Offer Zone also retains unqualified right to cancel any order at its sole discretion prior to dispatch and
                      for any reason which may include, but not limited to, the product being mispriced, out of stock, expired,
                      defective, malfunctioned, and containing incorrect information or description arising out of technical or
                      typographical error or for any other reason.
                      <br className="mt-2 block" />
                      14.2 Refund Timeline: If any order is canceled, the payment against such order shall be refunded within
                      10 working days, but it may take longer time in exceptional cases.
                    </p>

                  </div>
                </div>

                <div className="mt-8">
                  <div className="col-md-12">
                    <h5 className="text-xl  font-bold">Article 15: Governing Laws</h5>
                    <p className="mt-4" >
                      15.1 Offer Zone is governed by the laws and regulations of Bangladesh. Partners and Users agree to the Bangladesh courts, with the District Court of Dhaka as the court of the first instance,
                      will have jurisdiction over any dispute or claim relating to the use of Services or the Website of Offer Zone.
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <DownloadApps />
    </>
  );
}

TermsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "terms",
        "footer",
      ])),
    },
  };
};
