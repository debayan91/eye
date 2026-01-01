export const operations = [
    {
        slug: "cataract-surgery",
        title: "Cataract Surgery",
        subtitle: "MICS (Micro-Incision Cataract Surgery)",
        heroDescription: "A safe, minimally invasive procedure replacing the cloudy natural lens with an artificial IOL.",
        overview: `Cataract surgery is one of the most commonly performed and safest surgical procedures worldwide. At our clinic, we specialize in Micro-Incision Cataract Surgery (MICS), which uses an incision of less than 2mm for faster healing and better outcomes.

The surgery involves removing the clouded natural lens through a process called phacoemulsification—using ultrasound energy to break up the lens—and replacing it with a clear artificial Intraocular Lens (IOL).

With Dr. Dutta's experience of over 40,000 successful surgeries, patients can expect precision, safety, and excellent visual outcomes.`,
        procedureSteps: [
            { step: 1, title: "Pre-operative Assessment", description: "Comprehensive eye examination including biometry to calculate IOL power, corneal topography, and overall eye health evaluation." },
            { step: 2, title: "Anesthesia", description: "Topical anesthetic drops are applied to numb the eye. No injections are typically required." },
            { step: 3, title: "Micro-Incision", description: "A tiny incision (less than 2mm) is made at the edge of the cornea." },
            { step: 4, title: "Capsulorhexis", description: "A circular opening is created in the lens capsule to access the cataract." },
            { step: 5, title: "Phacoemulsification", description: "Ultrasound energy breaks up the cloudy lens, which is then gently suctioned out." },
            { step: 6, title: "IOL Implantation", description: "A foldable artificial lens is inserted through the micro-incision and positioned in the lens capsule." },
            { step: 7, title: "Self-Sealing", description: "The micro-incision is self-sealing, usually requiring no stitches." }
        ],
        recovery: {
            timeline: "Most patients notice improved vision within 24-48 hours. Full stabilization occurs within 4-6 weeks.",
            instructions: [
                "Use prescribed eye drops as directed",
                "Wear protective eye shield while sleeping for 1 week",
                "Avoid rubbing or pressing on the eye",
                "Avoid swimming and dusty environments for 2 weeks",
                "Attend all follow-up appointments"
            ]
        },
        faqs: [
            { question: "Is cataract surgery painful?", answer: "No, the procedure is virtually painless. Topical anesthetic drops ensure you feel no discomfort during surgery." },
            { question: "How long does the surgery take?", answer: "The actual procedure typically takes only 10-15 minutes per eye." },
            { question: "When can I return to normal activities?", answer: "Most patients can resume light activities within a day or two. Strenuous activities should be avoided for about a week." },
            { question: "Will I need glasses after surgery?", answer: "This depends on the type of IOL chosen. Multifocal and trifocal IOLs can significantly reduce or eliminate the need for glasses." }
        ],
        relatedVideos: ["v1", "v3", "v12"]
    },
    {
        slug: "lasik-smile",
        title: "LASIK & SMILE",
        subtitle: "Refractive Vision Correction",
        heroDescription: "Laser procedures to reshape the cornea and correct myopia, hyperopia, and astigmatism.",
        overview: `LASIK (Laser-Assisted In Situ Keratomileusis) and SMILE (Small Incision Lenticule Extraction) are advanced laser vision correction procedures that can reduce or eliminate dependence on glasses and contact lenses.

LASIK involves creating a thin corneal flap and using an excimer laser to reshape the underlying corneal tissue. SMILE is a newer, minimally invasive technique that extracts a small piece of corneal tissue through a tiny incision without creating a flap.

Both procedures offer excellent outcomes for patients with refractive errors, with the choice depending on individual eye characteristics and lifestyle needs.`,
        procedureSteps: [
            { step: 1, title: "Comprehensive Evaluation", description: "Detailed corneal mapping, thickness measurement, and refractive error assessment." },
            { step: 2, title: "Customized Planning", description: "Computer-guided treatment plan based on your unique corneal topography." },
            { step: 3, title: "Laser Treatment", description: "For LASIK: flap creation and excimer laser reshaping. For SMILE: femtosecond laser creates a lenticule that is removed through a small incision." },
            { step: 4, title: "Immediate Recovery", description: "Vision improvement begins within hours. Most patients achieve functional vision by the next day." }
        ],
        recovery: {
            timeline: "Vision stabilizes over 1-3 months. Most patients achieve their best vision within the first week.",
            instructions: [
                "Use lubricating drops frequently",
                "Avoid rubbing your eyes",
                "Wear sunglasses outdoors",
                "Skip eye makeup for one week",
                "Avoid swimming for 2 weeks"
            ]
        },
        faqs: [
            { question: "Am I a candidate for laser vision correction?", answer: "Ideal candidates are over 18, have stable vision for at least a year, and have adequate corneal thickness. A comprehensive evaluation will determine your suitability." },
            { question: "What is the difference between LASIK and SMILE?", answer: "LASIK creates a corneal flap, while SMILE removes a small piece of tissue through a tiny incision. SMILE may be better for dry eye prone patients." },
            { question: "Is the procedure permanent?", answer: "Yes, the corneal reshaping is permanent. However, age-related changes like presbyopia can still occur." },
            { question: "What are the risks?", answer: "Serious complications are rare. Temporary dry eyes and visual disturbances like halos are the most common side effects and usually resolve over time." }
        ],
        relatedVideos: ["v7", "v11"]
    },
    {
        slug: "glaucoma-therapy",
        title: "Glaucoma Therapy",
        subtitle: "MIGS & Trabeculectomy",
        heroDescription: "Advanced medical and surgical interventions to lower eye pressure and prevent optic nerve damage.",
        overview: `Glaucoma is a group of eye conditions that damage the optic nerve, often due to elevated intraocular pressure (IOP). It is a leading cause of irreversible blindness, which is why early detection and treatment are critical.

Our approach to glaucoma management includes:
- Medical therapy with eye drops to reduce IOP
- Laser procedures (SLT - Selective Laser Trabeculoplasty)
- Minimally Invasive Glaucoma Surgery (MIGS)
- Traditional filtration surgery (Trabeculectomy) for advanced cases

The goal is to preserve vision by maintaining IOP at a level that prevents further optic nerve damage.`,
        procedureSteps: [
            { step: 1, title: "Diagnosis", description: "Comprehensive testing including IOP measurement, visual field testing, OCT of the optic nerve, and gonioscopy." },
            { step: 2, title: "Medical Management", description: "Eye drops are usually the first line of treatment to reduce fluid production or increase drainage." },
            { step: 3, title: "Laser Treatment", description: "SLT uses laser to improve fluid drainage through the trabecular meshwork." },
            { step: 4, title: "MIGS", description: "Micro-stents or micro-incisional procedures enhance natural drainage pathways with minimal tissue disruption." },
            { step: 5, title: "Trabeculectomy", description: "A surgical procedure that creates a new drainage channel for fluid to reduce pressure." }
        ],
        recovery: {
            timeline: "Recovery varies by procedure. MIGS recovery is rapid (days), while trabeculectomy may require several weeks for optimal healing.",
            instructions: [
                "Use all prescribed medications as directed",
                "Attend regular follow-up appointments for IOP monitoring",
                "Protect eyes from injury",
                "Report any sudden vision changes immediately",
                "Lifelong monitoring is essential"
            ]
        },
        faqs: [
            { question: "Can glaucoma be cured?", answer: "Glaucoma cannot be cured, but it can be controlled. Treatment aims to prevent further vision loss." },
            { question: "Will I lose my vision from glaucoma?", answer: "With proper treatment and monitoring, most patients maintain useful vision throughout their lives." },
            { question: "How often do I need check-ups?", answer: "Initially every 1-3 months, then typically every 3-6 months once stable. Your doctor will advise based on your specific case." },
            { question: "Are there any warning signs?", answer: "Open-angle glaucoma usually has no symptoms until significant damage occurs. Regular eye exams are crucial for early detection." }
        ],
        relatedVideos: []
    },
    {
        slug: "corneal-transplant",
        title: "Corneal Transplant",
        subtitle: "Keratoplasty (PK, DALK, DSAEK)",
        heroDescription: "Replacing damaged corneal tissue with healthy donor tissue to restore vision.",
        overview: `Corneal transplantation (keratoplasty) is a surgical procedure to replace part or all of a damaged cornea with healthy donor corneal tissue. The cornea is the clear, dome-shaped surface that covers the front of the eye and is essential for clear vision.

Types of corneal transplants we perform:
- **PK (Penetrating Keratoplasty)**: Full-thickness corneal replacement
- **DALK (Deep Anterior Lamellar Keratoplasty)**: Partial-thickness replacement of front layers
- **DSAEK/DMEK**: Replacement of only the inner endothelial layer

The choice of technique depends on which corneal layers are affected and the underlying condition.`,
        procedureSteps: [
            { step: 1, title: "Evaluation", description: "Assessment of corneal condition, visual potential, and overall eye health." },
            { step: 2, title: "Donor Tissue Matching", description: "High-quality donor corneal tissue is obtained from an eye bank and matched to the patient." },
            { step: 3, title: "Surgery", description: "The damaged corneal tissue is removed and replaced with the donor tissue, secured with fine sutures or specialized techniques." },
            { step: 4, title: "Healing", description: "The eye gradually heals over months. Sutures may be removed over time as healing progresses." }
        ],
        recovery: {
            timeline: "Initial healing takes 1-2 months. Full visual recovery may take 6-12 months or longer depending on the procedure type.",
            instructions: [
                "Use prescribed anti-rejection eye drops faithfully",
                "Protect the eye from injury at all times",
                "Avoid rubbing or pressing on the eye",
                "Attend all follow-up appointments",
                "Report any signs of rejection immediately (redness, sensitivity, vision changes)"
            ]
        },
        faqs: [
            { question: "Where does the donor cornea come from?", answer: "Donor corneas come from eye banks that carefully screen and preserve tissue from deceased donors." },
            { question: "What is corneal rejection?", answer: "Rejection occurs when the immune system attacks the donor tissue. It can often be treated if caught early." },
            { question: "How long does a corneal transplant last?", answer: "Most transplants last many years to a lifetime, though some may eventually need to be repeated." },
            { question: "Will I need glasses after the transplant?", answer: "Most patients will need glasses or contact lenses for best vision after healing is complete." }
        ],
        relatedVideos: []
    },
    {
        slug: "oculoplasty",
        title: "Oculoplasty",
        subtitle: "Eyelid & Orbital Surgery",
        heroDescription: "Cosmetic and reconstructive surgeries for eyelids, tear ducts, and the eye socket.",
        overview: `Oculoplasty encompasses a range of surgical procedures involving the eyelids, orbit (eye socket), tear drainage system, and surrounding facial structures. These surgeries can be functional (to improve vision or comfort) or cosmetic (to enhance appearance).

Common oculoplastic procedures include:
- **Blepharoplasty**: Eyelid lift to remove excess skin and fat
- **Ptosis repair**: Correction of drooping eyelids
- **Entropion/Ectropion repair**: Correcting inward or outward turning eyelids
- **DCR (Dacryocystorhinostomy)**: Tear duct surgery for blocked drainage
- **Orbital surgery**: Tumor removal, fracture repair, and thyroid eye disease management`,
        procedureSteps: [
            { step: 1, title: "Consultation", description: "Detailed examination and discussion of concerns, goals, and treatment options." },
            { step: 2, title: "Surgical Planning", description: "Precise measurements and surgical plan tailored to your anatomy and goals." },
            { step: 3, title: "Surgery", description: "Most procedures are performed under local anesthesia on an outpatient basis." },
            { step: 4, title: "Recovery", description: "Initial swelling and bruising resolve over 1-2 weeks. Final results are seen after several months." }
        ],
        recovery: {
            timeline: "Most patients return to normal activities within 1-2 weeks. Full cosmetic results are visible after 2-3 months.",
            instructions: [
                "Apply cold compresses to reduce swelling",
                "Keep the head elevated",
                "Use prescribed ointments and drops",
                "Avoid strenuous activities for 2 weeks",
                "Protect the surgical area from sun exposure"
            ]
        },
        faqs: [
            { question: "Is blepharoplasty just cosmetic?", answer: "While it can improve appearance, many patients have it for functional reasons—excess skin can obstruct vision." },
            { question: "Will there be visible scars?", answer: "Incisions are placed in natural creases and typically heal to be nearly invisible." },
            { question: "How long do results last?", answer: "Results are long-lasting, though natural aging continues over time." },
            { question: "What is recovery like?", answer: "Expect some swelling and bruising for 1-2 weeks. Most patients feel comfortable going out after 7-10 days." }
        ],
        relatedVideos: ["v13"]
    },
    {
        slug: "retina-services",
        title: "Retina Services",
        subtitle: "Medical & Surgical Retina",
        heroDescription: "Management of diabetic retinopathy, retinal detachment, and macular degeneration.",
        overview: `The retina is the light-sensitive layer at the back of the eye that is essential for vision. Retinal conditions can cause significant vision loss if not promptly treated. Our comprehensive retina services address a wide range of conditions.

Conditions we treat:
- **Diabetic Retinopathy**: Damage to retinal blood vessels from diabetes
- **Age-related Macular Degeneration (AMD)**: Central vision loss in older adults
- **Retinal Detachment**: Separation of the retina from underlying tissue (emergency)
- **Macular Holes and Epiretinal Membranes**: Conditions affecting central vision
- **Retinal Vein Occlusions**: Blocked blood vessels in the retina

Treatments include intravitreal injections, laser therapy, and vitreoretinal surgery.`,
        procedureSteps: [
            { step: 1, title: "Comprehensive Retinal Exam", description: "Dilated examination, OCT imaging, and fluorescein angiography as needed." },
            { step: 2, title: "Diagnosis", description: "Detailed assessment to determine the nature and extent of retinal disease." },
            { step: 3, title: "Treatment Planning", description: "Individualized treatment plan based on the specific condition and severity." },
            { step: 4, title: "Intervention", description: "May include injections, laser treatment, or surgery depending on the condition." },
            { step: 5, title: "Monitoring", description: "Regular follow-up to monitor progress and adjust treatment as needed." }
        ],
        recovery: {
            timeline: "Recovery varies widely depending on the condition and treatment. Injection procedures have minimal recovery, while surgery may require several weeks.",
            instructions: [
                "Follow medication schedules precisely",
                "Maintain blood sugar control if diabetic",
                "Report any sudden vision changes immediately",
                "Attend all scheduled follow-up appointments",
                "Protect eyes from injury"
            ]
        },
        faqs: [
            { question: "Can diabetic retinopathy be reversed?", answer: "Early changes can sometimes improve with blood sugar control. Advanced disease is managed to prevent progression." },
            { question: "What are intravitreal injections?", answer: "Medications injected directly into the eye to treat conditions like AMD and diabetic macular edema. The procedure is quick and well-tolerated." },
            { question: "Is retinal detachment an emergency?", answer: "Yes. Retinal detachment requires urgent treatment to prevent permanent vision loss." },
            { question: "How often will I need injections for AMD?", answer: "Initially monthly, then potentially less frequent based on response. Treatment is ongoing for most patients." }
        ],
        relatedVideos: []
    }
];
