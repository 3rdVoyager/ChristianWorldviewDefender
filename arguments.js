const worldviewData = [
  {
    id: 1,
    discipline: "Theology",
    worldview: "Secularism",
    argument: "There is no objective evidence for a deity, so we must rely on reason rather than ancient myths.",
    coreIssue: "Atheism",
    christianResponse: "The complexity of the universe suggests a Designer, and the Resurrection has a factual basis.",
    logicalFallacy: "Genetic Fallacy",
    supportingReasoning: "The Anthropic Principle shows fine-tuning; eyewitness accounts support the Resurrection."
  },
  {
    id: 2,
    discipline: "Philosophy",
    worldview: "Secularism",
    argument: "Either something can be proven by the scientific method, or it is a total illusion.",
    coreIssue: "Materialism",
    christianResponse: "Limiting reality to the physical ignores logic, justice, and consciousness.",
    logicalFallacy: "False Dilemma",
    supportingReasoning: "Laws of logic are non-physical; if only matter exists, thoughts are just chemical accidents, not truth."
  },
  {
    id: 3,
    discipline: "Ethics",
    worldview: "Secularism",
    argument: "Ethics must be relative; otherwise, you have to believe in a sky-god who hates human freedom.",
    coreIssue: "Relativism",
    christianResponse: "True ethics are based on the unchanging nature of God, providing a ground to condemn evil.",
    logicalFallacy: "Strawman",
    supportingReasoning: "Without a transcendent standard, justice is just the opinion of the majority."
  },
  {
    id: 4,
    discipline: "Biology",
    worldview: "Secularism",
    argument: "Mutations and natural selection created life; to deny this is to be an anti-science literalist.",
    coreIssue: "Neo-Darwinism",
    christianResponse: "The information in DNA is too complex to be accidental; it indicates an intelligent mind.",
    logicalFallacy: "Ad Hominem",
    supportingReasoning: "Statistical probability argues against proteins forming by chance; code requires a coder."
  },
  {
    id: 5,
    discipline: "Psychology",
    worldview: "Secularism",
    argument: "Your \"soul\" is just a chemical reaction; once the brain dies, the soul is gone.",
    coreIssue: "Mind/Body Monism",
    christianResponse: "Humans possess an immaterial soul that gives them value beyond physical biology.",
    logicalFallacy: "Circular Reasoning",
    supportingReasoning: "The \"hard problem of consciousness\" shows subjective experience isn't fully explained by neurons."
  },
  {
    id: 6,
    discipline: "Sociology",
    worldview: "Secularism",
    argument: "I knew a religious person who was a hypocrite, so organized religion shouldn't dictate any values.",
    coreIssue: "Personal Autonomy",
    christianResponse: "True freedom is found in our design, recognizing responsibilities to God and community.",
    logicalFallacy: "Hasty Gen.",
    supportingReasoning: "Autonomy without accountability leads to social fragmentation and human isolation."
  },
  {
    id: 7,
    discipline: "Law",
    worldview: "Secularism",
    argument: "You only believe in \"Natural Law\" because you were raised in a conservative religious home.",
    coreIssue: "Legal Positivism",
    christianResponse: "Laws should be grounded in Natural Law to protect fundamental rights from government overreach.",
    logicalFallacy: "Genetic Fallacy",
    supportingReasoning: "If law is only what the majority says, there is no logical basis for inalienable rights."
  },
  {
    id: 8,
    discipline: "Politics",
    worldview: "Secularism",
    argument: "We must use the state to reform society, because the alternative is being stuck in the Dark Ages.",
    coreIssue: "Progressivism",
    christianResponse: "Government's role is to restrain evil, but it cannot perfect a fundamentally fallen humanity.",
    logicalFallacy: "False Dilemma",
    supportingReasoning: "Utopian projects often result in loss of liberty because they ignore the reality of human sin."
  },
  {
    id: 9,
    discipline: "Economics",
    worldview: "Secularism",
    argument: "The state must regulate the market, because any other system is just pure greed.",
    coreIssue: "Interventionism",
    christianResponse: "Economic freedom allows individuals to practice stewardship and serve others.",
    logicalFallacy: "Strawman",
    supportingReasoning: "Biblical stewardship emphasizes personal responsibility over state-mandated redistribution."
  },
  {
    id: 10,
    discipline: "History",
    worldview: "Secularism",
    argument: "Humanity is getting better because we are more modern and smarter than people 100 years ago.",
    coreIssue: "Social Progress",
    christianResponse: "History is a narrative of a fallen world being redeemed by God’s intervention.",
    logicalFallacy: "Non-Sequitur",
    supportingReasoning: "The 20th century was the most \"scientific\" but also the bloodiest, contradicting moral progress."
  },
  {
    id: 11,
    discipline: "Theology",
    worldview: "Marxism",
    argument: "Religion is an oppressive tool used by the ruling class to keep the working class submissive.",
    coreIssue: "Atheism",
    christianResponse: "Christianity is a call to justice, teaching that all people are accountable to God.",
    logicalFallacy: "Genetic Fallacy",
    supportingReasoning: "The Bible consistently calls for protection of the poor and holds authorities to a higher Law."
  },
  {
    id: 12,
    discipline: "Philosophy",
    worldview: "Marxism",
    argument: "Reality is shaped by economic struggle; if you don't see that, you're a \"useful idiot\" for capitalists.",
    coreIssue: "Dialectical Mat.",
    christianResponse: "History is driven by ideas, choices, and the spiritual state of individuals, not just money.",
    logicalFallacy: "Ad Hominem",
    supportingReasoning: "Economics doesn't explain the pursuit of beauty, faith, or self-sacrifice."
  },
  {
    id: 13,
    discipline: "Ethics",
    worldview: "Marxism",
    argument: "Whatever helps the working class is good; anything else is evil bourgeois propaganda.",
    coreIssue: "Proletariat Mor.",
    christianResponse: "Morality is defined by universal truths that apply to everyone, regardless of class.",
    logicalFallacy: "False Dilemma",
    supportingReasoning: "If morality shifts based on power, then there is no actual justice, only raw force."
  },
  {
    id: 14,
    discipline: "Biology",
    worldview: "Marxism",
    argument: "Evolution happens in rapid bursts, which proves that social revolutions are natural.",
    coreIssue: "Punctuated Eq.",
    christianResponse: "Life was created with fixed boundaries by a Creator; the fossil record lacks transitional links.",
    logicalFallacy: "Non-Sequitur",
    supportingReasoning: "The fossil record shows stasis and sudden appearance, which fits special creation."
  },
  {
    id: 15,
    discipline: "Psychology",
    worldview: "Marxism",
    argument: "Behavior is a product of social conditioning; once we fix the system, people will stop being selfish.",
    coreIssue: "Mind/Body Monism",
    christianResponse: "Humans have a free will and a nature that requires internal spiritual change.",
    logicalFallacy: "Circular Reasoning",
    supportingReasoning: "Environmental changes cannot remove the internal human inclination toward selfishness."
  },
  {
    id: 16,
    discipline: "Sociology",
    worldview: "Marxism",
    argument: "To be for the family is to be for oppression; we must dismantle it to be truly equal.",
    coreIssue: "Proletariat Soc.",
    christianResponse: "The family is a God-ordained institution that provides the foundation for a healthy society.",
    logicalFallacy: "Strawman",
    supportingReasoning: "These institutions act as a buffer between the individual and the tyranny of the state."
  },
  {
    id: 17,
    discipline: "Law",
    worldview: "Marxism",
    argument: "The legal system is a weapon of the elite; we must take it over to empower the workers.",
    coreIssue: "Proletariat Law",
    christianResponse: "The law should be an impartial standard of justice based on God’s moral law.",
    logicalFallacy: "Red Herring",
    supportingReasoning: "Laws targeting specific classes violate the principle of equality before the law."
  },
  {
    id: 18,
    discipline: "Politics",
    worldview: "Marxism",
    argument: "Either the state has centralized control to ensure equality, or the poor will starve.",
    coreIssue: "Statism",
    christianResponse: "Power should be decentralized because humans are inherently fallen and prone to corruption.",
    logicalFallacy: "False Dilemma",
    supportingReasoning: "Giving any small group total control over others always leads to systemic corruption."
  },
  {
    id: 19,
    discipline: "Economics",
    worldview: "Marxism",
    argument: "Private property is the root of all greed; therefore, abolishing it will end exploitation.",
    coreIssue: "Socialism",
    christianResponse: "The right to private property is biblical, but it includes the duty to honor God and others.",
    logicalFallacy: "Non-Sequitur",
    supportingReasoning: "Greed is a heart problem; abolishing property just changes how people compete for power."
  },
  {
    id: 20,
    discipline: "History",
    worldview: "Marxism",
    argument: "History is moving to a communist utopia; we know this because the system says it's inevitable.",
    coreIssue: "Historical Mat.",
    christianResponse: "History is moving toward the return of Christ, not a man-made utopia.",
    logicalFallacy: "Circular Reasoning",
    supportingReasoning: "Human nature is flawed; no human-led system can ever produce a perfect society."
  },
  {
    id: 21,
    discipline: "Theology",
    worldview: "Postmodernism",
    argument: "Absolute religious truth doesn't exist; anyone claiming it does is just trying to control you.",
    coreIssue: "Theological Susp.",
    christianResponse: "Claiming there is no absolute truth is itself an absolute claim.",
    logicalFallacy: "Self-Refuting",
    supportingReasoning: "To say \"there is no truth\" requires the statement itself to be true, a logical contradiction."
  },
  {
    id: 22,
    discipline: "Philosophy",
    worldview: "Postmodernism",
    argument: "Objective reality is impossible to know because our language filters everything we see.",
    coreIssue: "Anti-Realism",
    christianResponse: "God created us with the capacity to understand the reality He designed.",
    logicalFallacy: "Self-Refuting",
    supportingReasoning: "If we couldn't know reality, science wouldn't work; technology proves we perceive it accurately."
  },
  {
    id: 23,
    discipline: "Ethics",
    worldview: "Postmodernism",
    argument: "All morality is cultural; if you judge another culture, you are a narrow-minded bigot.",
    coreIssue: "Cultural Rel.",
    christianResponse: "If morality is purely cultural, we have no basis to condemn universal evils like genocide.",
    logicalFallacy: "Ad Hominem",
    supportingReasoning: "Universal moral prohibitions (like murder) point to a law written on the human heart."
  },
  {
    id: 24,
    discipline: "Biology",
    worldview: "Postmodernism",
    argument: "There is no \"human nature\"; we are just social constructs. To say otherwise is \"essentialism.\"",
    coreIssue: "Anti-Essent.",
    christianResponse: "We were created in the image of God with a specific nature as male and female.",
    logicalFallacy: "Genetic Fallacy",
    supportingReasoning: "Biology is not just a construct; male and female roles are rooted in physical and spiritual design."
  },
  {
    id: 25,
    discipline: "Psychology",
    worldview: "Postmodernism",
    argument: "There is no stable self; either you are a collection of social roles, or you don't exist at all.",
    coreIssue: "Decentered Self",
    christianResponse: "Each person is a unique, unified individual created by God with a consistent identity.",
    logicalFallacy: "False Dilemma",
    supportingReasoning: "Without a unified self, no one can be held morally responsible for their actions."
  },
  {
    id: 26,
    discipline: "Sociology",
    worldview: "Postmodernism",
    argument: "Marriage and family are just power-plays designed by the patriarchy to keep people in line.",
    coreIssue: "Social Const.",
    christianResponse: "God established marriage and family as fundamental structures, not mere constructs.",
    logicalFallacy: "Strawman",
    supportingReasoning: "These structures exist across diverse cultures, suggesting a universal human design."
  },
  {
    id: 27,
    discipline: "Law",
    worldview: "Postmodernism",
    argument: "The law is just a system of power for the elite; look at the Crusades and see how bad law is!",
    coreIssue: "Critical Legal St.",
    christianResponse: "Law should reflect objective justice and Natural Law, ensuring equal treatment for all.",
    logicalFallacy: "Red Herring",
    supportingReasoning: "If law is only about power, then rights don't exist; justice requires a standard above rulers."
  },
  {
    id: 28,
    discipline: "Politics",
    worldview: "Postmodernism",
    argument: "Political systems are failed power structures; we should just deconstruct everything.",
    coreIssue: "Pol. Pessimism",
    christianResponse: "We should engage in politics to promote justice and seek the common good.",
    logicalFallacy: "Non-Sequitur",
    supportingReasoning: "Deconstruction offers no positive vision; we are called to build flourishing communities."
  },
  {
    id: 29,
    discipline: "Economics",
    worldview: "Postmodernism",
    argument: "The economy is rigged, so the state must redistribute power; any other view is \"privilege.\"",
    coreIssue: "Interventionism",
    christianResponse: "True justice is found in protecting rights and encouraging voluntary stewardship.",
    logicalFallacy: "Ad Hominem",
    supportingReasoning: "Top-down redistribution often ignores individual needs and the importance of localized care."
  },
  {
    id: 30,
    discipline: "History",
    worldview: "Postmodernism",
    argument: "History is just a story told by winners; so, we should rewrite it to suit our own narrative.",
    coreIssue: "Hist. Revisionism",
    christianResponse: "History should be a pursuit of objective facts, acknowledging both successes and failures.",
    logicalFallacy: "Equivocation",
    supportingReasoning: "While bias exists, historical methods allow us to reconstruct what actually happened."
  },
  {
    id: 31,
    discipline: "Theology",
    worldview: "New Spirituality",
    argument: "God is energy; energy is God. Since everything is energy, everything is God.",
    coreIssue: "Pantheism",
    christianResponse: "God is the personal Creator who is distinct from His creation.",
    logicalFallacy: "Equivocation",
    supportingReasoning: "The universe had a beginning, requiring a Cause outside of time, space, and matter."
  },
  {
    id: 32,
    discipline: "Philosophy",
    worldview: "New Spirituality",
    argument: "The physical world is an illusion; the only thing real is the \"Universal Spirit.\"",
    coreIssue: "Spiritual Monism",
    christianResponse: "God created both the physical and spiritual realms as real and good.",
    logicalFallacy: "False Dilemma",
    supportingReasoning: "Our physical senses and the laws of physics are reliable, indicating the material world is real."
  },
  {
    id: 33,
    discipline: "Ethics",
    worldview: "New Spirituality",
    argument: "Karma is true because everyone gets what they deserve because of the law of Karma.",
    coreIssue: "Karma",
    christianResponse: "We are under the grace of a personal God who offers forgiveness for sin.",
    logicalFallacy: "Circular Reasoning",
    supportingReasoning: "Karma has no room for mercy; the Gospel offers freedom from the past through Christ."
  },
  {
    id: 34,
    discipline: "Biology",
    worldview: "New Spirituality",
    argument: "We are evolving into gods; you only disagree because you're stuck in \"lower consciousness.\"",
    coreIssue: "Spiritual Evol.",
    christianResponse: "Humanity is not evolving into gods; we find purpose in a relationship with God.",
    logicalFallacy: "Ad Hominem",
    supportingReasoning: "If we were becoming gods, we would see humanity becoming more moral, but we don't."
  },
  {
    id: 35,
    discipline: "Psychology",
    worldview: "New Spirituality",
    argument: "True health is tapping into your inner divinity; why would you look for a God outside yourself?",
    coreIssue: "Mind/Body Monism",
    christianResponse: "Peace is not found by looking inward, but by looking to the God who created us.",
    logicalFallacy: "Red Herring",
    supportingReasoning: "Seeking divinity within leads to pride; seeking God leads to humility and love for others."
  },
  {
    id: 36,
    discipline: "Sociology",
    worldview: "New Spirituality",
    argument: "If we all vibrate at a higher frequency, war will end; either we unite spirits or we perish.",
    coreIssue: "Coll. Conscious.",
    christianResponse: "Global peace will come through Christ, not through human consciousness.",
    logicalFallacy: "False Dilemma",
    supportingReasoning: "True peace requires the reconciliation of sinful hearts, not just a shared \"mindset.\""
  },
  {
    id: 37,
    discipline: "Law",
    worldview: "New Spirituality",
    argument: "You are your own law-giver because you are part of the divine universe.",
    coreIssue: "Self-Law",
    christianResponse: "True law is not subjective; it is based on the objective moral character of God.",
    logicalFallacy: "Non-Sequitur",
    supportingReasoning: "Subjective law cannot resolve conflicts between two people with different \"inner truths.\""
  },
  {
    id: 38,
    discipline: "Politics",
    worldview: "New Spirituality",
    argument: "We don't need laws if we are enlightened; the only reason you want laws is because you're afraid.",
    coreIssue: "Autarchy",
    christianResponse: "Because humans are fallen, we need external laws to maintain order and justice.",
    logicalFallacy: "Ad Hominem",
    supportingReasoning: "Self-rule assumes natural goodness, but the reality of selfishness makes governance necessary."
  },
  {
    id: 39,
    discipline: "Economics",
    worldview: "New Spirituality",
    argument: "You're only poor because your spirit is out of alignment with the abundance of the universe.",
    coreIssue: "Universal Prod.",
    christianResponse: "Prosperity is a gift from God, but we are called to work hard and manage resources.",
    logicalFallacy: "Strawman",
    supportingReasoning: "Material success is not a guarantee of spiritual health; faithfulness matters more."
  },
  {
    id: 40,
    discipline: "History",
    worldview: "New Spirituality",
    argument: "History is the record of our journey to godhood; we know this by looking at our potential.",
    coreIssue: "Evol. Godhood",
    christianResponse: "History is the story of humanity’s fall and God’s plan to restore us through Jesus.",
    logicalFallacy: "Hasty Gen.",
    supportingReasoning: "The cyclical nature of this view offers no hope; the biblical narrative promises victory over evil."
  },
  {
    id: 41,
    discipline: "Theology",
    worldview: "Islam",
    argument: "There is only one God; the Trinity is just a way for Christians to believe in three gods.",
    coreIssue: "Monotheism",
    christianResponse: "God is one in essence but exists eternally in three persons.",
    logicalFallacy: "Strawman",
    supportingReasoning: "The Trinity explains how God could be \"Love\" before He ever created anything."
  },
  {
    id: 42,
    discipline: "Philosophy",
    worldview: "Islam",
    argument: "The physical and spiritual are real; we submit to Allah's will because it's Allah's will.",
    coreIssue: "Dualism",
    christianResponse: "We submit to God through the power of the Holy Spirit, not just our effort.",
    logicalFallacy: "Circular Reasoning",
    supportingReasoning: "Human effort alone cannot overcome the corruption of the heart; we need transformation."
  },
  {
    id: 43,
    discipline: "Ethics",
    worldview: "Islam",
    argument: "Something is good because Allah said so; if you question it, you are being rebellious.",
    coreIssue: "Divine Command",
    christianResponse: "God’s commands are not arbitrary; they reflect His perfectly good and loving character.",
    logicalFallacy: "Ad Hominem",
    supportingReasoning: "If good is just a command, God could have commanded cruelty; Christian ethics say God is Good."
  },
  {
    id: 44,
    discipline: "Biology",
    worldview: "Islam",
    argument: "Allah created the world in time; therefore, Neo-Darwinism is a western lie.",
    coreIssue: "Special Creation",
    christianResponse: "God created the world to share His love, not just to be served as an absolute ruler.",
    logicalFallacy: "Genetic Fallacy",
    supportingReasoning: "The purpose of creation is communion with the Creator through the incarnation of Christ."
  },
  {
    id: 45,
    discipline: "Psychology",
    worldview: "Islam",
    argument: "You are born pure; either you maintain that purity through effort, or you fail Allah.",
    coreIssue: "Mind/Body Dual.",
    christianResponse: "We are born with a sinful nature and need a Savior to transform us from the inside out.",
    logicalFallacy: "False Dilemma",
    supportingReasoning: "Our universal tendency toward selfishness confirms the biblical description of a fallen nature."
  },
  {
    id: 46,
    discipline: "Sociology",
    worldview: "Islam",
    argument: "The Ummah is the only perfect society; look at how many Muslims there are!",
    coreIssue: "Ummah",
    christianResponse: "God established the family and the state as distinct spheres with their own authority.",
    logicalFallacy: "Hasty Gen.",
    supportingReasoning: "Combining religious and civil authority often leads to the suppression of conscience."
  },
  {
    id: 47,
    discipline: "Law",
    worldview: "Islam",
    argument: "Shariah is the only way to be just; all human laws are just attempts to rebel against God.",
    coreIssue: "Shariah Law",
    christianResponse: "True justice is found in a legal system that respects Natural Law and conscience.",
    logicalFallacy: "Strawman",
    supportingReasoning: "\"General Revelation\" allows even non-believers to recognize basic justice and moral truth."
  },
  {
    id: 48,
    discipline: "Politics",
    worldview: "Islam",
    argument: "Either the state is ruled by the Quran, or it is a godless land of sin.",
    coreIssue: "Theocracy",
    christianResponse: "The state and church have different roles: civil order vs. spiritual matters.",
    logicalFallacy: "False Dilemma",
    supportingReasoning: "When the state enforces religion, faith becomes outward compliance rather than heart-sincerity."
  },
  {
    id: 49,
    discipline: "Economics",
    worldview: "Islam",
    argument: "We must ban interest and pay zakat because that is the only way to have an Islamic economy.",
    coreIssue: "Shariah Econ.",
    christianResponse: "Justice and compassion are best achieved through stewardship and private initiative.",
    logicalFallacy: "Non-Sequitur",
    supportingReasoning: "Voluntary generosity is a sign of a transformed heart, more so than mandatory religious taxes."
  },
  {
    id: 50,
    discipline: "History",
    worldview: "Islam",
    argument: "Islam will inevitably rule the world; we know this because the faith is expanding.",
    coreIssue: "Pan-Islam",
    christianResponse: "History is moving toward the return of Jesus and His eternal kingdom of peace.",
    logicalFallacy: "Non-Sequitur",
    supportingReasoning: "The Great Commission is a call to share the Gospel through love, not to build a political empire."
  }
];