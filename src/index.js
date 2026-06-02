'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const count = await strapi.db.query('api::testimonial.testimonial').count();
    if (count === 0) {
      console.log('Seeding testimonials...');
      const fallbackTestimonials = [
        {
          stars: 5,
          text: 'Zapa Mortgage is one of the top choices in Houston. My experience was seamless thanks to the efforts of Hamza, Zohaib, and the amazing Edi Sheikh. They managed everything with great professionalism. Highly recommend!',
          author: 'Abdul Qadir, Houston TX',
          order: 10
        },
        {
          stars: 5,
          text: 'Edi Bhai, Saif, Syed, and Usha are all great. The team truly understands client needs and works hard to deliver. I\'ll definitely do more business with them again!',
          author: 'Jozy Amir',
          order: 20
        },
        {
          stars: 5,
          text: 'Hamza and Edi Bhai are a great team. They stay by your side until the very end and ensure the job gets done. This was my 3rd loan with them and they are the best in the market!',
          author: 'Anum Qadri',
          order: 30
        },
        {
          stars: 5,
          text: 'Their expertise and professionalism were evident from the start. They guided me through the process with ease and secured a fantastic mortgage rate. Highly recommended!',
          author: 'Waleed Ashfaq',
          order: 40
        },
        {
          stars: 5,
          text: 'I\'m very happy with the Zapa Mortgage team – sincere, hardworking, and punctual. They completed my loan on time and now I\'m enjoying my new home. Best mortgage company!',
          author: 'Jamil Karim',
          order: 50
        },
        {
          stars: 5,
          text: 'Despite my busy schedule, Edi, Saif, Syed, and the team helped me close quickly with the best rate. They stayed on top of everything and made the process smooth.',
          author: 'Shak A',
          order: 60
        },
        {
          stars: 5,
          text: 'Best mortgage team! All members are very professional, patient, and helpful. Thank you, Edi Brother and team!',
          author: 'Nurjahan Sheik',
          order: 70
        },
        {
          stars: 5,
          text: 'The Zapa Mortgage team is awesome! Edi Bhai and the team helped us secure loans for 3 houses, guiding us every step of the way. Always available to answer questions. Highly recommended!',
          author: 'Ahmed',
          order: 80
        },
        {
          stars: 5,
          text: 'We had a great experience with Zapa Mortgage, especially Abdullah, Edi, Usha, and Nida. They are professional and quick to respond, making the process easy to understand. Highly recommended!',
          author: 'Faizan Siddiqui',
          order: 90
        },
      ];

      for (const t of fallbackTestimonials) {
        await strapi.entityService.create('api::testimonial.testimonial', {
          data: {
            ...t,
            publishedAt: new Date(),
          },
        });
      }
      console.log('Seeding testimonials successfully.');
    }

    const faqCount = await strapi.db.query('api::faq.faq').count();
    if (faqCount === 0) {
      console.log('Seeding FAQs...');
      const fallbackFaqsGrouped = [
        {
          category: 'Getting Started',
          questions: [
            { question: 'What is a mortgage?', answer: 'A mortgage is a loan used to purchase or refinance a home. The property serves as collateral, meaning the lender can foreclose if you fail to make payments. Mortgages typically have terms of 15 or 30 years and include principal and interest payments.' },
            { question: 'How do I start the home buying process?', answer: "Start by getting pre-approved for a mortgage. This involves completing an application and providing documents like pay stubs, bank statements, W-2s, and tax returns. Pre-approval shows sellers you're a serious buyer and helps you understand your budget." },
            { question: "What's the difference between pre-qualification and pre-approval?", answer: 'Pre-qualification is an informal estimate based on self-reported information. Pre-approval is a conditional commitment from a lender after reviewing your credit, income, assets, and documentation. Pre-approval carries much more weight with sellers.' }
          ]
        },
        {
          category: 'Credit & Qualifications',
          questions: [
            { question: 'What credit score do I need to buy a home?', answer: 'Credit score requirements vary by loan type. FHA loans may start around 580, conventional loans typically require 620 or higher, and VA loans are often flexible. However, higher credit scores qualify for better interest rates. Your full financial profile matters, not just your credit score.' },
            { question: 'Can I buy a home with bad credit?', answer: 'Yes, there are options for buyers with lower credit scores. FHA loans accept scores as low as 580 (or 500 with a larger down payment). Non-QM and alternative financing programs may also be available. Contact me to discuss your specific situation.' },
            { question: 'How much income do I need to qualify?', answer: "There's no specific income requirement. Instead, lenders look at your debt-to-income ratio (DTI), which compares your monthly debt payments to your gross monthly income. Most conventional loans require a DTI below 43-50%, though FHA and other programs may allow higher ratios." },
            { question: "Can I qualify if I'm self-employed?", answer: 'Yes! Self-employed borrowers have several options including traditional documentation (2 years tax returns), bank statement loans, profit & loss programs, and DSCR loans for investment properties. Each program has different requirements and benefits.' },
            { question: 'Do I need to be a U.S. citizen to get a mortgage?', answer: 'No. Many loan programs are available for permanent residents (green card holders), ITIN holders, and foreign nationals. Requirements vary by program, but homeownership is accessible to non-citizens.' }
          ]
        },
        {
          category: 'Down Payment & Costs',
          questions: [
            { question: 'How much down payment do I need?', answer: 'Down payment requirements vary by loan type: VA loans allow 0% down, FHA requires 3.5%, USDA loans offer 0% down in eligible rural areas, and conventional loans range from 3% to 20%. A 20% down payment eliminates the need for private mortgage insurance (PMI).' },
            { question: 'What are closing costs and how much should I expect to pay?', answer: 'Closing costs typically range from 2-5% of the loan amount and include appraisal fees, title insurance, escrow fees, origination fees, credit report fees, and prepaid items like property taxes and insurance. I can provide a detailed estimate based on your specific loan.' },
            { question: 'Can the seller pay my closing costs?', answer: 'Yes, sellers can contribute to closing costs, though limits apply. Conventional loans allow up to 3-9% depending on down payment, FHA allows up to 6%, and VA allows up to 4% in concessions. This is negotiated as part of your offer.' },
            { question: 'What is PMI and how can I avoid it?', answer: "Private Mortgage Insurance (PMI) protects the lender if you default. It's required on conventional loans with less than 20% down. You can avoid PMI by putting 20% down, using a piggyback loan (80-10-10), or choosing a VA or USDA loan (which have their own insurance)." }
          ]
        },
        {
          category: 'Loan Types',
          questions: [
            { question: "What's the difference between FHA, VA, and conventional loans?", answer: 'Conventional loans are not government-backed and typically require higher credit scores and larger down payments. FHA loans are insured by the federal government with lower credit and down payment requirements. VA loans are available to veterans and active military with 0% down and no PMI. Each has unique benefits depending on your situation.' },
            { question: 'What is a jumbo loan?', answer: 'A jumbo loan exceeds the conforming loan limits set by Fannie Mae and Freddie Mac (typically $766,550 in 2024, higher in expensive areas). Jumbo loans usually require higher credit scores, larger down payments, and have stricter qualification requirements.' },
            { question: 'What is a DSCR loan?', answer: "A Debt Service Coverage Ratio (DSCR) loan is designed for investment properties and qualifies you based on the property's rental income rather than your personal income. This is ideal for real estate investors who want to avoid traditional income documentation." },
            { question: 'Should I choose a fixed-rate or adjustable-rate mortgage?', answer: 'Fixed-rate mortgages maintain the same interest rate for the life of the loan, providing payment stability. Adjustable-rate mortgages (ARMs) start with a lower rate that adjusts periodically based on market conditions. ARMs can save money if you plan to sell or refinance before the rate adjusts.' }
          ]
        },
        {
          category: 'Process & Timeline',
          questions: [
            { question: 'How long does the mortgage process take?', answer: 'Pre-approval typically takes 24-48 hours. Once you have a contract, most purchases close within 30-45 days. Refinances may be quicker. Timeline depends on documentation completeness, appraisal scheduling, and title work.' },
            { question: 'What documents do I need to apply?', answer: "Typical documents include: recent pay stubs (30 days), W-2s (2 years), tax returns (2 years), bank statements (2 months), government-issued ID, and explanations for any credit issues. Self-employed borrowers may need additional documentation. I'll provide a complete checklist based on your situation." },
            { question: 'What is underwriting?', answer: 'Underwriting is when the lender reviews and verifies all your documentation, income, assets, credit, and the property to ensure you meet loan guidelines. The underwriter may request additional documents or explanations. This is a critical step before final approval.' },
            { question: 'What is an appraisal and why is it required?', answer: "An appraisal is an independent assessment of the property's market value conducted by a licensed appraiser. Lenders require appraisals to ensure the property is worth at least the loan amount, protecting both you and the lender from overpaying." },
            { question: 'Can I lock my interest rate?', answer: 'Yes, you can lock your interest rate to protect against rate increases during the loan process. Rate locks typically last 30-60 days. If rates drop significantly after locking, some lenders offer float-down options for a fee.' }
          ]
        },
        {
          category: 'Refinancing',
          questions: [
            { question: 'What is refinancing?', answer: 'Refinancing replaces your current mortgage with a new one, typically to get a lower interest rate, change loan terms, switch from an ARM to a fixed rate, or access home equity through a cash-out refinance.' },
            { question: 'When should I refinance my mortgage?', answer: 'Consider refinancing when: interest rates drop significantly (typically 0.5-1% lower), your credit score improves, you want to eliminate PMI, you need to access equity, or you want to change your loan term. Calculate whether the monthly savings justify the closing costs.' },
            { question: 'What is a cash-out refinance?', answer: "A cash-out refinance allows you to borrow more than you owe on your current mortgage and receive the difference in cash. This can be used for home improvements, debt consolidation, or other major expenses. You'll need sufficient equity in your home." },
            { question: 'What is the difference between a rate-and-term refinance and a cash-out refinance?', answer: 'A rate-and-term refinance changes your interest rate or loan term without taking cash out (beyond closing costs). A cash-out refinance increases your loan balance to access equity. Rate-and-term refinances typically have lower rates and fewer restrictions.' }
          ]
        },
        {
          category: 'Special Situations',
          questions: [
            { question: 'Can I buy a home with student loan debt?', answer: "Yes! Student loans are factored into your debt-to-income ratio, but they don't automatically disqualify you. Lenders typically use either 1% of the balance or the actual payment shown on your credit report. Income-driven repayment plans and deferments have specific calculation rules." },
            { question: 'What happens if I have a bankruptcy or foreclosure in my past?', answer: "You can still get a mortgage after bankruptcy or foreclosure, but waiting periods apply. FHA allows purchases 2 years after bankruptcy discharge and 3 years after foreclosure. Conventional loans typically require 4-7 years. You'll need to demonstrate credit rebuilding and financial stability." },
            { question: 'Can I buy an investment property with a mortgage?', answer: 'Yes! Investment property loans are available through conventional financing (typically requiring 15-25% down), DSCR loans, and other investor-focused programs. Investment properties have different qualification requirements and usually higher interest rates than primary residences.' },
            { question: 'Can I use gift money for my down payment?', answer: "Yes, most loan programs allow gift funds from family members. The donor will need to provide a gift letter stating the funds are a gift, not a loan. Documentation showing the transfer of funds is required. Some programs have restrictions on the percentage that can be gifted." },
            { question: "What if I'm buying a fixer-upper?", answer: "FHA 203(k) and Fannie Mae HomeStyle loans allow you to finance both the purchase and renovation costs in a single mortgage. These programs are ideal for properties needing significant repairs that wouldn't qualify for traditional financing." }
          ]
        },
        {
          category: 'Interest Rates & Payments',
          questions: [
            { question: 'How are mortgage interest rates determined?', answer: 'Rates are influenced by broader economic factors (Federal Reserve policy, inflation, bond markets) and personal factors (credit score, down payment, loan type, property type, loan amount). Your specific rate depends on your financial profile and current market conditions.' },
            { question: "What's included in my monthly mortgage payment?", answer: 'Most mortgage payments include PITI: Principal (loan repayment), Interest, property Taxes (held in escrow), and Insurance (homeowners insurance and possibly PMI or FHA mortgage insurance). HOA fees, if applicable, are typically paid separately.' },
            { question: 'Can I make extra payments to pay off my mortgage faster?', answer: "Most mortgages allow extra payments without penalty. Additional payments toward principal reduce total interest paid and shorten the loan term. Verify your loan doesn't have a prepayment penalty, though these are rare on modern mortgages." },
            { question: 'Should I pay points to lower my interest rate?', answer: 'Discount points are prepaid interest that lower your rate. One point costs 1% of the loan amount and typically reduces the rate by 0.25%. This makes sense if you plan to keep the loan long enough to recoup the upfront cost through lower monthly payments. I can calculate the break-even point for you.' }
          ]
        },
        {
          category: 'Final Steps',
          questions: [
            { question: 'What happens at closing?', answer: "At closing, you'll sign all loan documents, pay closing costs and down payment, and receive the keys to your new home. You'll review the Closing Disclosure, sign the promissory note, mortgage/deed of trust, and other required documents. Bring a cashier's check or arrange a wire transfer for funds needed to close." },
            { question: 'What is title insurance and do I need it?', answer: "Title insurance protects against financial loss from defects in title to real property (liens, encumbrances, ownership disputes). Lender's title insurance is required; owner's title insurance is optional but highly recommended to protect your investment." },
            { question: 'When do I make my first mortgage payment?', answer: "Your first payment is typically due on the first day of the month following 30 days after closing. For example, if you close on January 15th, your first payment is due March 1st. You'll pay interest for the period from closing to the end of that month at closing." },
            { question: 'What if I have more questions?', answer: "I'm here to help! Call me at +1-346-610-0555, text me, email me at edi@eywamortgage.com, or use the contact form on my website. Every situation is unique, and I'll provide personalized guidance based on your specific needs." }
          ]
        }
      ];

      let order = 10;
      for (const group of fallbackFaqsGrouped) {
        for (const q of group.questions) {
          await strapi.entityService.create('api::faq.faq', {
            data: {
              category: group.category,
              question: q.question,
              answer: q.answer,
              order: order,
              isActive: true,
              publishedAt: new Date(),
            },
          });
          order += 10;
        }
      }
      console.log('Seeded FAQs successfully.');
    }

    // ── Company Seeding (Strapi v5 Document Service) ────────────────────────
    console.log('Syncing companies...');
    const fallbackCompanies = [
      {
        code: 'EYWA',
        name: 'EYWA Mortgage',
        logoUrl: '/logos/eywa-logo-1.png',
        subtitle: 'EYWA MORTGAGE, Inc. NMLS # 1660690 | Powered by NEXA Lending | Mesa, Arizona',
        nmlsNumber: '1660690',
        poweredBy: 'Powered by NEXA Mortgage',
        address: '5559 S Sossaman Rd, Bldg 1 Ste 101\nMesa, AZ 85212',
        tollFree: '+1-888-886-1555',
        cell: '+1-346-610-0555',
        email: 'edi@eywamortgage.com',
        licenseText: 'Licensed in: AL, AZ (LO-2010950), CO, CT, FL (LO140551), LA, MO, OR, PA, TN, TX, CA (DFPI216981), VA & WA (MLO-216981)',
        order: 10,
      },
      {
        code: 'ZAPA',
        name: 'ZAPA Mortgage',
        logoUrl: '/logos/zapa-logo-1.png',
        subtitle: 'ZAPA MORTGAGE, Inc. NMLS # 357630 | Houston, Texas',
        nmlsNumber: '357630',
        poweredBy: '',
        address: '1601 Industrial Blvd, Ste 3019,\nSugar Land, TX 77478',
        tollFree: '855-WHY-ZAPA',
        cell: '+1-832-977-4499',
        email: 'rigel@zapamortgage.com',
        licenseText: 'Licensed in: TX',
        order: 20,
      },
    ];

    for (const comp of fallbackCompanies) {
      // Strapi v5 Document Service: findMany with filters
      const existing = await strapi.documents('api::company.company').findMany({
        filters: { code: { $eq: comp.code } },
        status: 'published',
      });

      if (existing.length === 0) {
        await strapi.documents('api::company.company').create({
          data: comp,
          status: 'published',
        });
        console.log(`Created company: ${comp.code}`);
      } else {
        await strapi.documents('api::company.company').update(existing[0].documentId, {
          data: comp,
          status: 'published',
        });
        console.log(`Updated company: ${comp.code}`);
      }
    }
    console.log('Companies synced successfully.');

    // ── Grant Public role access to company collection ────────────────────────
    try {
      const publicRole = await strapi.db
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (publicRole) {
        const actions = ['api::company.company.find', 'api::company.company.findOne'];
        for (const action of actions) {
          const existing = await strapi.db
            .query('plugin::users-permissions.permission')
            .findOne({ where: { action, role: publicRole.id } });

          if (!existing) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: { action, role: publicRole.id, enabled: true },
            });
            console.log(`Granted public permission: ${action}`);
          } else if (!existing.enabled) {
            await strapi.db.query('plugin::users-permissions.permission').update({
              where: { id: existing.id },
              data: { enabled: true },
            });
            console.log(`Enabled public permission: ${action}`);
          }
        }
      }
    } catch (err) {
      console.error('Could not set company permissions:', err.message);
    }
  },
};
