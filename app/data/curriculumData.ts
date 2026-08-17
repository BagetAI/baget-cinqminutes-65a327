export interface LessonDay {
  id: number;
  dayNumber: number;
  week: number;
  weekTitle: string;
  phaseCode: "validation" | "offer" | "prospects" | "legal" | "launch";
  title: string;
  subtitle: string;
  durationMinutes: number;
  badge: string;
  concept: {
    title: string;
    readingTime: string;
    summary: string;
    keyPoints: string[];
    exampleGood: string;
    exampleBad: string;
    takeaway: string;
  };
  microAction: {
    title: string;
    executionTime: string;
    instruction: string;
    fieldLabel: string;
    fieldType: "text" | "textarea" | "select" | "options";
    placeholder: string;
    options?: string[];
    sampleValue: string;
    helpTip: string;
  };
  deliverableKey: string;
  deliverableLabel: string;
  initialStatus: "completed" | "current" | "locked";
}

export const CURRICULUM_DATA: LessonDay[] = [
  // ==========================================
  // SEMAINE 1 : IDÉE & VALIDATION DU BESOIN (Jours 1 à 7)
  // ==========================================
  {
    id: 1,
    dayNumber: 1,
    week: 1,
    weekTitle: "Semaine 1 : Valider le besoin sans budget",
    phaseCode: "validation",
    title: "L'inventaire de vos compétences monétisables",
    subtitle: "Identifier ce que vous savez déjà faire et pour quoi les gens sont prêts à payer.",
    durationMinutes: 5,
    badge: "Compétences",
    concept: {
      title: "La méthode des 3 cercles de compétence",
      readingTime: "2 min",
      summary: "Vous n'avez pas besoin d'un nouveau diplôme pour démarrer. Les compétences les plus rentables sont souvent celles qui vous paraissent évidentes mais qui font perdre un temps précieux aux autres.",
      keyPoints: [
        "Identifiez ce que vos collègues ou amis vous demandent régulièrement.",
        "Listez les outils ou méthodes que vous maîtrisez mieux que la moyenne.",
        "La valeur perçue vient du temps et de la charge mentale que vous économisez à votre client."
      ],
      exampleGood: "Je sais structurer des tableaux Excel automatisés pour des artisans qui passent 3h par semaine sur leurs devis.",
      exampleBad: "Je suis passionné par l'informatique générale et le développement personnel.",
      takeaway: "Une bonne compétence monétisable résout un problème précis pour une cible identifiable."
    },
    microAction: {
      title: "Lister votre compétence d'ancrage",
      executionTime: "3 min",
      instruction: "Remplissez votre compétence principale et le résultat concret qu'elle apporte.",
      fieldLabel: "Votre compétence d'ancrage :",
      fieldType: "textarea",
      placeholder: "Ex: Je maîtrise la création de tunnels de vente simples sur Notion et Canva...",
      sampleValue: "Rédaction de profils LinkedIn et pages de vente claires pour consultants indépendants.",
      helpTip: "Soyez le plus spécifique possible sur le résultat final obtenu par le client."
    },
    deliverableKey: "core_skill",
    deliverableLabel: "Compétence d'ancrage",
    initialStatus: "completed"
  },
  {
    id: 2,
    dayNumber: 2,
    week: 1,
    weekTitle: "Semaine 1 : Valider le besoin sans budget",
    phaseCode: "validation",
    title: "Détecter un irritant client douloureux",
    subtitle: "Identifier le problème n°1 qui empêche votre cible de dormir.",
    durationMinutes: 5,
    badge: "Problème",
    concept: {
      title: "Vendre un analgésique, pas une vitamine",
      readingTime: "2 min",
      summary: "Une vitamine est agréable mais optionnelle. Un analgésique soulage une douleur aiguë immédiate. Votre offre doit être perçue comme un analgésique pour déclencher l'achat sans hésitation.",
      keyPoints: [
        "Les clients paient pour éliminer une frustration urgente ou un risque de perte financière.",
        "Écoutez les plaintes récurrentes sur les réseaux, forums et groupes professionnels.",
        "Plus la douleur est mesurable (heures perdues, chiffre d'affaires manqué), plus la vente est fluide."
      ],
      exampleGood: "Les consultants passent 6h par semaine à relancer des prospects par email sans obtenir de réponse.",
      exampleBad: "Les gens aimeraient être un peu plus organisés dans leur vie professionnelle.",
      takeaway: "Pas de douleur urgente = pas de décision d'achat rapide."
    },
    microAction: {
      title: "Formuler l'irritant n°1 de votre client",
      executionTime: "3 min",
      instruction: "Décrivez la frustration principale que vous allez supprimer chez votre client cible.",
      fieldLabel: "L'irritant majeur résolu :",
      fieldType: "textarea",
      placeholder: "Ex: Ils manquent de temps pour prospecter et détestent le démarchage à froid...",
      sampleValue: "Ils n'ont pas de visibilité sur LinkedIn et n'arrivent pas à générer des demandes entrantes qualifiées.",
      helpTip: "Quantifiez l'impact : perte de temps, stress, argent non gagné."
    },
    deliverableKey: "pain_point",
    deliverableLabel: "Irritant majeur résolu",
    initialStatus: "completed"
  },
  {
    id: 3,
    dayNumber: 3,
    week: 1,
    weekTitle: "Semaine 1 : Valider le besoin sans budget",
    phaseCode: "validation",
    title: "Le test du 'Prêt à payer'",
    subtitle: "Vérifier si le marché dépense déjà de l'argent pour ce type de solution.",
    durationMinutes: 5,
    badge: "Marché",
    concept: {
      title: "Ne cherchez pas à être le tout premier",
      readingTime: "2 min",
      summary: "La présence de concurrents est le meilleur signe d'un marché rentable. Si personne ne paie pour ce service aujourd'hui, c'est généralement que le besoin n'est pas solvable.",
      keyPoints: [
        "Vérifiez sur Malt, Fiverr ou Google si des indépendants vendent déjà cette prestation.",
        "Repérez les tarifs pratiqués pour vous positionner de manière cohérente.",
        "Votre différence ne sera pas le service brut, mais votre réactivité, votre angle ou votre clarté."
      ],
      exampleGood: "30 freelances proposent de la rédaction de posts LinkedIn sur Malt avec des avis 5 étoiles à 300€/mois.",
      exampleBad: "Personne n'a jamais proposé ça, je vais devoir évangéliser tout le marché de zéro.",
      takeaway: "Un marché existant avec des concurrents actifs garantit la solvabilité de votre offre."
    },
    microAction: {
      title: "Preuve de solvabilité observée",
      executionTime: "3 min",
      instruction: "Notez au moins un exemple concret de solution similaire payante trouvée sur le marché.",
      fieldLabel: "Preuve de marché existant :",
      fieldType: "text",
      placeholder: "Ex: 15 freelances trouvés sur Malt entre 250€ et 600€ par mois...",
      sampleValue: "Des agences de ghostwriting facturent 800€/mois pour 8 posts, des freelances entre 350€ et 500€.",
      helpTip: "Un simple coup d'œil sur Malt ou Google suffit pour valider la solvabilité."
    },
    deliverableKey: "market_proof",
    deliverableLabel: "Preuve de solvabilité",
    initialStatus: "completed"
  },
  {
    id: 4,
    dayNumber: 4,
    week: 1,
    weekTitle: "Semaine 1 : Valider le besoin sans budget",
    phaseCode: "validation",
    title: "Votre client idéal (Persona sans blabla)",
    subtitle: "Définir précisément à qui vous parlez en 3 critères simples.",
    durationMinutes: 5,
    badge: "Cible",
    concept: {
      title: "Parler à tout le monde, c'est ne parler à personne",
      readingTime: "2 min",
      summary: "Au lancement, une cible ultra-précise vous rend immédiatement mémorisable. Il est plus facile d'être le spécialiste incontournable d'une niche que le généraliste anonyme d'un secteur vaste.",
      keyPoints: [
        "Critère 1 : Le rôle ou métier exact (ex: coach sportif indépendant, consultant RH, artisan électricien).",
        "Critère 2 : La situation actuelle (ex: démarre son activité, a trop de clients mais pas de temps).",
        "Critère 3 : La capacité financière à payer votre prestation."
      ],
      exampleGood: "Consultants B2B solos générant déjà 3 000€ à 6 000€/mois qui veulent automatiser leur prospection.",
      exampleBad: "Toutes les personnes qui ont envie d'entreprendre ou de réussir.",
      takeaway: "Une cible précise divise par 5 le coût et l'effort d'acquisition de vos premiers clients."
    },
    microAction: {
      title: "Rédiger votre fiche Persona en 1 phrase",
      executionTime: "3 min",
      instruction: "Définissez votre cible en complétant la formule.",
      fieldLabel: "Description de la cible idéale :",
      fieldType: "textarea",
      placeholder: "Ex: Les dirigeants de TPE de 1 à 5 salariés dans le bâtiment qui...",
      sampleValue: "Consultants B2B et formateurs solos en France qui veulent 2 rendez-vous qualifiés par semaine sans prospecter à la main.",
      helpTip: "Vérifiez que cette personne a le budget pour payer vos prestations."
    },
    deliverableKey: "ideal_client",
    deliverableLabel: "Cible idéale (Persona)",
    initialStatus: "completed"
  },
  {
    id: 5,
    dayNumber: 5,
    week: 1,
    weekTitle: "Semaine 1 : Valider le besoin sans budget",
    phaseCode: "validation",
    title: "L'angle de différenciation express",
    subtitle: "Ce qui vous rend instantanément unique aux yeux de votre client.",
    durationMinutes: 5,
    badge: "Différenciation",
    concept: {
      title: "Les 4 leviers de différenciation rapide",
      readingTime: "2 min",
      summary: "Pour vous démarquer sans réinventer la roue, appuyez-vous sur un de ces 4 leviers : la spécialisation métier, la rapidité d'exécution, la simplicité du livrable ou une tarification forfaitaire transparente.",
      keyPoints: [
        "Spécialisation : 'Le seul rédacteur dédié aux experts comptables'.",
        "Délai garanti : 'Votre site livré en 48 heures chrono'.",
        "Simplicité : 'Un tableau de bord Notion clé en main sans abonnement logiciel'."
      ],
      exampleGood: "Mes fiches de prospection sont rédigées et prêtes à l'emploi en moins de 72 heures sans réunion interminable.",
      exampleBad: "Je propose un service de grande qualité avec beaucoup de passion.",
      takeaway: "Votre différence doit être un critère concret et facilement vérifiable par le client."
    },
    microAction: {
      title: "Choisir votre levier de différenciation",
      executionTime: "3 min",
      instruction: "Sélectionnez votre axe principal et décrivez votre promesse de différenciation.",
      fieldLabel: "Axe de différenciation retenu :",
      fieldType: "options",
      options: [
        "Rapidité d'exécution (livré en moins de 72h)",
        "Spécialisation sectorielle (niche métier exclusive)",
        "Simplicité radicale (zéro outil complexe, clé en main)",
        "Accompagnement 1-on-1 direct sans intermédiaire"
      ],
      placeholder: "Sélectionnez votre levier",
      sampleValue: "Rapidité d'exécution (livré en moins de 72h)",
      helpTip: "Un seul axe clair suffit largement pour démarrer."
    },
    deliverableKey: "differentiation_axis",
    deliverableLabel: "Axe de différenciation",
    initialStatus: "completed"
  },
  {
    id: 6,
    dayNumber: 6,
    week: 1,
    weekTitle: "Semaine 1 : Valider le besoin sans budget",
    phaseCode: "validation",
    title: "Le Pitch de curiosité en 20 secondes",
    subtitle: "Savoir expliquer ce que vous faites quand on vous demande 'Et toi, tu fais quoi ?'",
    durationMinutes: 5,
    badge: "Pitch",
    concept: {
      title: "La formule anti-endormissement",
      readingTime: "2 min",
      summary: "Ne parlez pas de votre statut ou de vos outils. Parlez du problème résolu et de la transformation pour votre client. Le but d'un pitch n'est pas de tout expliquer, mais de susciter la question : 'Ah bon ? Et comment tu fais ?'.",
      keyPoints: [
        "Structure en 3 temps : Problème constaté > Solution proposée > Résultat mesurable.",
        "Bannissez les mots valises : synergie, optimisation 360, solutions innovantes.",
        "Testez votre pitch auprès d'un proche : il doit comprendre en 5 secondes."
      ],
      exampleGood: "Tu vois comme les indépendants galèrent à trouver des clients sur LinkedIn ? Je leur rédige leurs posts chaque semaine pour leur apporter 2 prospects qualifiés par mois.",
      exampleBad: "Je suis consultant indépendant en stratégie de contenu digital cross-canal omnicanale.",
      takeaway: "Un bon pitch donne envie d'en savoir plus immédiatement."
    },
    microAction: {
      title: "Rédiger votre Pitch de curiosité",
      executionTime: "3 min",
      instruction: "Remplissez votre phrase de présentation spontanée.",
      fieldLabel: "Votre pitch en 20 secondes :",
      fieldType: "textarea",
      placeholder: "Ex: J'aide les restaurateurs à doubler leurs avis Google positifs en 30 jours sans passer par une agence...",
      sampleValue: "J'aide les consultants solos à attirer des demandes entrantes sur LinkedIn sans passer 2h par jour à rédiger.",
      helpTip: "Lisez-le à voix haute pour vérifier le naturel du ton."
    },
    deliverableKey: "elevator_pitch",
    deliverableLabel: "Pitch de curiosité",
    initialStatus: "completed"
  },
  {
    id: 7,
    dayNumber: 7,
    week: 1,
    weekTitle: "Semaine 1 : Valider le besoin sans budget",
    phaseCode: "validation",
    title: "Bilan Semaine 1 : Validation des signaux au vert",
    subtitle: "Vérifier les 3 feux verts avant d'attaquer la conception de l'offre.",
    durationMinutes: 5,
    badge: "Validation",
    concept: {
      title: "La checklist des 3 feux verts",
      readingTime: "2 min",
      summary: "Avant de packager votre offre en Semaine 2, validez ces 3 éléments fondamentaux : 1. Vous savez résoudre ce problème. 2. Des gens paient déjà pour cela. 3. Vous savez où trouver votre cible.",
      keyPoints: [
        "Feu vert 1 : Compétence concrète et utile validée.",
        "Feu vert 2 : Marché solvable et concurrents identifiés.",
        "Feu vert 3 : Cible claire et facilement contactable."
      ],
      exampleGood: "Mes 3 feux sont au vert, je peux packager mon offre commerciale en toute confiance.",
      exampleBad: "Je veux encore passer 3 semaines à réfléchir au logo avant de parler à des clients.",
      takeaway: "La clarté vient de l'action, pas de la sur-réflexion."
    },
    microAction: {
      title: "Valider les feux verts de Semaine 1",
      executionTime: "3 min",
      instruction: "Cochez les validations obtenues et confirmez votre passage en Semaine 2.",
      fieldLabel: "Statut des feux verts :",
      fieldType: "options",
      options: [
        "3 feux verts confirmés (Compétence + Marché + Cible)",
        "2 feux verts confirmés (Ajustement mineur de cible en cours)"
      ],
      placeholder: "Sélectionnez votre état",
      sampleValue: "3 feux verts confirmés (Compétence + Marché + Cible)",
      helpTip: "Félicitations pour avoir complété les 7 premiers jours !"
    },
    deliverableKey: "week1_review",
    deliverableLabel: "Validation Semaine 1",
    initialStatus: "completed"
  },

  // ==========================================
  // SEMAINE 2 : OFFRE & TARIFICATION (Jours 8 à 14) - JOUR ACTIF = JOUR 8
  // ==========================================
  {
    id: 8,
    dayNumber: 8,
    week: 2,
    weekTitle: "Semaine 2 : Structurer et packager l'offre",
    phaseCode: "offer",
    title: "La formule de la Promesse Irrésistible",
    subtitle: "Rédiger la promesse clé qui donne envie d'acheter en une seule lecture.",
    durationMinutes: 5,
    badge: "Offre Clé",
    concept: {
      title: "La structure 'Cible + Bénéfice + Anti-Friction'",
      readingTime: "2 min",
      summary: "Une offre irrésistible ne décrit pas votre temps passé, mais la transformation apportée. En combinant la cible exacte, le bénéfice principal et la suppression du frein majeur, vous éliminez les doutes du prospect.",
      keyPoints: [
        "Formule magique : 'J'aide [Cible] à obtenir [Résultat mesurable] sans [Gros point noir / contrainte habituelle]'.",
        "Le résultat doit être tangible et vérifiable.",
        "L'anti-friction répond à l'objection numéro un de votre cible avant même qu'elle ne la formule."
      ],
      exampleGood: "J'aide les consultants B2B à obtenir 3 rendez-vous qualifiés par mois sur LinkedIn sans y passer plus de 15 minutes par semaine.",
      exampleBad: "Je fais du community management et du conseil en stratégie digitale pour développer votre visibilité.",
      takeaway: "Une bonne promesse rend le refus difficile et la décision limpide."
    },
    microAction: {
      title: "Construire votre promesse irrésistible",
      executionTime: "3 min",
      instruction: "Complétez la formule exacte adaptée à votre projet en remplissant les 3 variables.",
      fieldLabel: "Votre formule de promesse :",
      fieldType: "textarea",
      placeholder: "J'aide [qui ?] à obtenir [quel résultat ?] sans [quelle contrainte ?]...",
      sampleValue: "J'aide les consultants indépendants à générer 2 rendez-vous clients qualifiés par mois grâce à une présence LinkedIn optimisée, sans devoir passer des heures à rédiger eux-mêmes.",
      helpTip: "Utilisez des verbes d'action concrets : générer, économiser, signer, automatiser."
    },
    deliverableKey: "value_proposition",
    deliverableLabel: "Promesse de Valeur Irrésistible",
    initialStatus: "current"
  },
  {
    id: 9,
    dayNumber: 9,
    week: 2,
    weekTitle: "Semaine 2 : Structurer et packager l'offre",
    phaseCode: "offer",
    title: "Découper son offre en 3 étapes limpides",
    subtitle: "Rassurer le client sur le déroulement exact de la mission.",
    durationMinutes: 5,
    badge: "Packaging",
    concept: {
      title: "Le protocole en 3 jalons visibles",
      readingTime: "2 min",
      summary: "L'inconnu fait peur. Quand un client achète une prestation, il veut savoir exactement comment ça va se passer. En présentant un processus en 3 étapes simples (ex: Diagnostic > Production > Restitution), vous projetez une maîtrise totale.",
      keyPoints: [
        "Étape 1 : Cadrage & Diagnostic (Échange court de 20 min).",
        "Étape 2 : Création & Exécution (Votre travail autonome).",
        "Étape 3 : Livraison & Ajustements (Validation finale rapide)."
      ],
      exampleGood: "1. Diagnostic de votre profil (30 min) > 2. Rédaction de 8 posts mensuels > 3. Validation et mise en ligne programmée.",
      exampleBad: "On verra ensemble au fur et à mesure de vos besoins ce qu'on peut faire.",
      takeaway: "Un processus clair justifie un prix plus élevé et accélère la signature."
    },
    microAction: {
      title: "Définir vos 3 étapes d'intervention",
      executionTime: "3 min",
      instruction: "Listez les 3 étapes chronologiques par lesquelles passe votre client.",
      fieldLabel: "Les 3 étapes de votre prestation :",
      fieldType: "textarea",
      placeholder: "1. Étape 1 : ...\n2. Étape 2 : ...\n3. Étape 3 : ...",
      sampleValue: "1. Session de cadrage de 30 min pour capter votre ton et vos sujets clés.\n2. Rédaction et livraison du pack de 8 publications optimisées sous 5 jours.\n3. Ajustements illimités pendant 48h et programmation automatique.",
      helpTip: "Chaque étape doit avoir un livrable concret associé."
    },
    deliverableKey: "service_steps",
    deliverableLabel: "Protocole d'intervention en 3 étapes",
    initialStatus: "locked"
  },
  {
    id: 10,
    dayNumber: 10,
    week: 2,
    weekTitle: "Semaine 2 : Structurer et packager l'offre",
    phaseCode: "offer",
    title: "Fixer son premier prix sans hésiter",
    subtitle: "Calculer son tarif forfaitaire plancher sans syndrome de l'imposteur.",
    durationMinutes: 5,
    badge: "Tarification",
    concept: {
      title: "Facturer à la valeur et au forfait, pas à l'heure",
      readingTime: "2 min",
      summary: "Vendre à l'heure vous pénalise à mesure que vous devenez plus rapide et efficace. Le forfait aligne vos intérêts avec ceux du client : il paie pour un résultat terminé, pas pour le temps que vous passez devant un écran.",
      keyPoints: [
        "Définissez votre TJM (Taux Journalier Moyen) de base (ex: 350€ à 500€/jour pour démarrer).",
        "Estimez le temps réel passé (ex: 1 journée de travail = forfait 450€).",
        "Ne commencez jamais en dessous de votre tarif plancher : le discount attire les clients difficiles."
      ],
      exampleGood: "Pack mensuel clé en main à 450€ TTC / mois pour 8 publications rédigées et optimisées.",
      exampleBad: "Je facture 25€ de l'heure et je vous dirai à la fin du mois combien d'heures j'ai passées.",
      takeaway: "Le forfait donne une visibilité totale au client et élimine la négociation d'heures."
    },
    microAction: {
      title: "Déterminer votre tarif de lancement",
      executionTime: "3 min",
      instruction: "Renseignez votre prix forfaitaire de lancement et ce qu'il inclut.",
      fieldLabel: "Tarif forfaitaire de lancement :",
      fieldType: "text",
      placeholder: "Ex: 450 € par mois ou 890 € par mission...",
      sampleValue: "450 € TTC par mois (Pack Décollage 8 posts)",
      helpTip: "Un prix rond et clair inspire confiance."
    },
    deliverableKey: "pricing_launch",
    deliverableLabel: "Grille tarifaire de lancement",
    initialStatus: "locked"
  },
  {
    id: 11,
    dayNumber: 11,
    week: 2,
    weekTitle: "Semaine 2 : Structurer et packager l'offre",
    phaseCode: "offer",
    title: "L'offre d'entrée 'Pied dans la porte'",
    subtitle: "Créer une version ultra-accessible pour transformer un curieux en client.",
    durationMinutes: 5,
    badge: "Conversion",
    concept: {
      title: "L'effet premier achat",
      readingTime: "2 min",
      summary: "Le plus difficile n'est pas de vendre une prestation à 500€, c'est de faire passer un prospect de 0€ à 1€. Une offre légère (ex: un audit express de 30 min à 90€) brise la glace et crée une relation de confiance immédiate.",
      keyPoints: [
        "L'offre d'entrée doit demander un investissement minime et sans risque.",
        "Elle délivre une victoire rapide et démontre votre professionnalisme.",
        "1 client sur 3 ayant acheté votre offre d'entrée souscrira votre offre principale."
      ],
      exampleGood: "Mini-audit vidéo de votre profil LinkedIn et 3 recommandations écrites pour 79€.",
      exampleBad: "Mon seul pack est un engagement de 6 mois à 3 000€ à payer d'avance.",
      takeaway: "Une petite transaction ouvre la porte aux grands contrats."
    },
    microAction: {
      title: "Concevoir votre mini-offre d'entrée",
      executionTime: "3 min",
      instruction: "Définissez un livrable express à petit prix (49€ à 120€) facile à acheter.",
      fieldLabel: "Votre offre d'entrée :",
      fieldType: "text",
      placeholder: "Ex: Audit flash de 30 minutes + plan d'action écrit à 79€...",
      sampleValue: "Audit flash de votre profil LinkedIn + réécriture de votre titre accrocheur à 69€.",
      helpTip: "Cette offre doit être réalisable en moins de 45 minutes pour vous."
    },
    deliverableKey: "front_offer",
    deliverableLabel: "Offre d'entrée (Pied dans la porte)",
    initialStatus: "locked"
  },
  {
    id: 12,
    dayNumber: 12,
    week: 2,
    weekTitle: "Semaine 2 : Structurer et packager l'offre",
    phaseCode: "offer",
    title: "La garantie sérénité anti-risque",
    subtitle: "Désarmer la peur de se tromper lors du premier contact.",
    durationMinutes: 5,
    badge: "Confiance",
    concept: {
      title: "Inverser le risque perçu",
      readingTime: "2 min",
      summary: "Lors de vos premières ventes, vos prospects hésitent car vous n'avez pas encore 50 avis publics. En offrant une garantie claire (ex: révisions illimitées jusqu'à validation complète), vous retirez tout risque de leurs épaules.",
      keyPoints: [
        "Garantie de satisfaction : ajustements garantis sous 48h.",
        "Pas d'engagement de durée pour démarrer le premier mois.",
        "La confiance accordée au client est remboursée au centuple par sa fidélité."
      ],
      exampleGood: "Si le premier jet ne correspond pas à vos attentes, réécriture complète sous 48h sans aucun surcoût.",
      exampleBad: "Paiement 100% non remboursable et aucun changement possible après livraison.",
      takeaway: "Prenez le risque sur vous pour donner confiance au client."
    },
    microAction: {
      title: "Rédiger votre engagement sérénité",
      executionTime: "3 min",
      instruction: "Indiquez la garantie concrète offerte à vos 3 premiers clients.",
      fieldLabel: "Votre garantie sérénité :",
      fieldType: "text",
      placeholder: "Ex: Ajustements illimités sous 48h jusqu'à validation intégrale...",
      sampleValue: "Garantie '100% aligné' : révisions illimitées jusqu'à ce que vous soyez totalement satisfait du texte.",
      helpTip: "Une formulation chaleureuse rassure immédiatement."
    },
    deliverableKey: "guarantee",
    deliverableLabel: "Garantie sérénité",
    initialStatus: "locked"
  },
  {
    id: 13,
    dayNumber: 13,
    week: 2,
    weekTitle: "Semaine 2 : Structurer et packager l'offre",
    phaseCode: "offer",
    title: "La Fiche Offre en 1 page (One-Pager)",
    subtitle: "Rassembler l'ensemble de votre proposition sur un document prêt à envoyer.",
    durationMinutes: 5,
    badge: "Support Vente",
    concept: {
      title: "La fin des propositions commerciales de 15 pages",
      readingTime: "2 min",
      summary: "Personne ne lit les devis fleuves de 15 pages. Une fiche synthétique d'une page avec le problème, la solution en 3 étapes, le prix et le bouton d'accord permet de conclure une vente en moins de 5 minutes.",
      keyPoints: [
        "Titre clair avec votre promesse irrésistible.",
        "Les 3 étapes du protocole et le calendrier prévisionnel.",
        "Le tarif forfaitaire TTC et les modalités simples de démarrage."
      ],
      exampleGood: "Une page Notion ou PDF épurée reprenant les 4 blocs essentiels avec un bouton de validation.",
      exampleBad: "Un document Word de 12 pages bourré de jargon juridique copié-collé sur internet.",
      takeaway: "La simplicité de votre document reflète la fluidité de votre travail."
    },
    microAction: {
      title: "Vérifier les 4 composants de votre One-Pager",
      executionTime: "3 min",
      instruction: "Confirmez les éléments prêts à être compilés dans votre dossier exportable.",
      fieldLabel: "Éléments compilés dans le One-Pager :",
      fieldType: "options",
      options: [
        "Promesse + Protocole 3 étapes + Prix forfaitaire + Garantie (Complet)",
        "Promesse et Prix validés (Protocole à finaliser)"
      ],
      placeholder: "Sélectionnez l'état",
      sampleValue: "Promesse + Protocole 3 étapes + Prix forfaitaire + Garantie (Complet)",
      helpTip: "Votre One-Pager sera automatiquement généré dans votre onglet Dossier."
    },
    deliverableKey: "one_pager_status",
    deliverableLabel: "Statut du One-Pager de vente",
    initialStatus: "locked"
  },
  {
    id: 14,
    dayNumber: 14,
    week: 2,
    weekTitle: "Semaine 2 : Structurer et packager l'offre",
    phaseCode: "offer",
    title: "Bilan Semaine 2 : Le test du pair",
    subtitle: "Faire relire son offre à un contact bienveillant pour valider l'impact.",
    durationMinutes: 5,
    badge: "Feedback",
    concept: {
      title: "Le test du miroir avant la prospection",
      readingTime: "2 min",
      summary: "Avant de contacter vos premiers prospects en Semaine 3, soumettez votre promesse et votre tarif à un ami ou un pair. S'il comprend l'offre sans que vous ayez besoin de rajouter des explications orales, vous êtes prêt.",
      keyPoints: [
        "Demandez : 'En lisant ça, est-ce que tu comprends exactement ce que je vends en 10 secondes ?'.",
        "Demandez : 'Qu'est-ce qui te semblerait flou ou bloquant si tu devais acheter ?'.",
        "Corrigez les derniers termes ambigus."
      ],
      exampleGood: "'C'est super clair, je comprends direct le résultat et le prix me paraît très honnête'.",
      exampleBad: "'Attends, mais tu fais aussi les vidéos ou juste les textes ? C'est pas très bien précisé'.",
      takeaway: "Une critique constructive aujourd'hui vous évite 10 refus demain."
    },
    microAction: {
      title: "Consigner le retour du test",
      executionTime: "3 min",
      instruction: "Notez la réaction principale obtenue lors de la relecture de votre offre.",
      fieldLabel: "Retour de validation de l'offre :",
      fieldType: "text",
      placeholder: "Ex: Offre validée par Alexandre, reformulation du point 2 pour plus de clarté...",
      sampleValue: "Offre relue et validée : message très clair, tarif 450€ perçu comme attractif.",
      helpTip: "Vous disposez désormais d'une offre commerciale prête à l'emploi !"
    },
    deliverableKey: "peer_feedback",
    deliverableLabel: "Validation de l'offre par un pair",
    initialStatus: "locked"
  },

  // ==========================================
  // SEMAINE 3 : PREMIERS CONTACTS & CONVERSIONS (Jours 15 à 21)
  // ==========================================
  {
    id: 15,
    dayNumber: 15,
    week: 3,
    weekTitle: "Semaine 3 : Décrocher ses 3 premiers clients",
    phaseCode: "prospects",
    title: "Le réseau chaud sans passer pour un vendeur lourd",
    subtitle: "Réactiver vos contacts proches avec un message bienveillant et décontracté.",
    durationMinutes: 5,
    badge: "Réseau Proche",
    concept: {
      title: "Demander du conseil, pas de l'argent",
      readingTime: "2 min",
      summary: "Vos premiers clients ne viendront pas de la publicité, mais de votre réseau de premier ou second degré. En partageant votre nouveau projet sous l'angle du conseil ('Je lance ce projet, ton avis m'intéresse'), vous désamorcez toute gêne.",
      keyPoints: [
        "Identifiez 10 contacts bienveillants dans votre carnet d'adresses.",
        "Envoyez un message court et personnalisé sans lien de paiement.",
        "Le réseau chaud adore recommander quand la demande est formulée avec humilité."
      ],
      exampleGood: "Salut Thomas, je lance une nouvelle activité d'aide à la rédaction LinkedIn pour indépendants. Comme tu connais bien ce secteur, je serais ravi d'avoir ton avis rapide sur mon offre !",
      exampleBad: "Bonjour, voici mes tarifs pour mes services de rédaction, achetez mon pack ici.",
      takeaway: "Demandez de l'aide et vous recevrez des clients."
    },
    microAction: {
      title: "Lister vos 3 premiers contacts chauds",
      executionTime: "3 min",
      instruction: "Notez les prénoms de 3 personnes de votre entourage professionnel à contacter.",
      fieldLabel: "Vos 3 contacts à solliciter :",
      fieldType: "textarea",
      placeholder: "1. Marc (ancien collègue consultant)\n2. Sophie (amie créatrice de contenu)\n3. Lucas...",
      sampleValue: "1. Nicolas (ex-collègue aujourd'hui consultant freelance)\n2. Camille (responsable comm rencontrée en meetup)\n3. Édouard (ami entrepreneur individuel)",
      helpTip: "Des personnes qui vous connaissent déjà et apprécient votre sérieux."
    },
    deliverableKey: "warm_leads",
    deliverableLabel: "Liste des 3 premiers contacts réseau",
    initialStatus: "locked"
  },
  {
    id: 16,
    dayNumber: 16,
    week: 3,
    weekTitle: "Semaine 3 : Décrocher ses 3 premiers clients",
    phaseCode: "prospects",
    title: "Les 3 communautés où se rassemblent vos clients",
    subtitle: "Repérer les espaces d'échanges existants sans dépenser 1 euro en publicité.",
    durationMinutes: 5,
    badge: "Canaux",
    concept: {
      title: "Se brancher sur les flux de trafic existants",
      readingTime: "2 min",
      summary: "Vos clients posent déjà des questions dans des groupes spécifiques : groupes Slack thématiques, communautés Discord, groupes Facebook de freelances, espaces coworking locaux. Vous n'avez qu'à vous rendre là où la conversation a déjà lieu.",
      keyPoints: [
        "Recherchez 3 groupes actifs avec au moins 500 membres actifs.",
        "Observez les questions récurrentes sans faire de publicité sauvage.",
        "Apportez une réponse utile et détaillée : vous serez contacté spontanément en message privé."
      ],
      exampleGood: "Groupe LinkedIn 'Freelances & Indépendants France' + Communauté Slack 'Le Cercle des Consultants'.",
      exampleBad: "Créer un nouveau compte Instagram vide et attendre que les gens arrivent tout seuls.",
      takeaway: "Allez là où vos clients discutent déjà de leurs problèmes."
    },
    microAction: {
      title: "Identifier vos 2 communautés clés",
      executionTime: "3 min",
      instruction: "Renseignez les noms des 2 communautés sélectionnées pour vos futures interactions.",
      fieldLabel: "Communautés cibles :",
      fieldType: "text",
      placeholder: "Ex: Groupe LinkedIn Freelances France + Slack Tribu...",
      sampleValue: "Groupe LinkedIn 'Indépendants & Consultants B2B' + Espace Coworking local",
      helpTip: "Privilégiez les communautés avec des échanges quotidiens actifs."
    },
    deliverableKey: "target_communities",
    deliverableLabel: "Communautés d'acquisition cibles",
    initialStatus: "locked"
  },
  {
    id: 17,
    dayNumber: 17,
    week: 3,
    weekTitle: "Semaine 3 : Décrocher ses 3 premiers clients",
    phaseCode: "prospects",
    title: "Le message d'approche direct et non-intrusif",
    subtitle: "Rédiger un template de message privé naturel pour déclencher des conversations.",
    durationMinutes: 5,
    badge: "Prospection Douce",
    concept: {
      title: "La conversation avant la conversion",
      readingTime: "2 min",
      summary: "Sur LinkedIn ou par email, 90% des messages de prospection échouent car ils cherchent à vendre dès la première phrase. Votre unique objectif avec un premier message est d'obtenir une réponse amicale de 2 lignes.",
      keyPoints: [
        "Mentionnez un élément personnalisé réel (un post récent, une actualité de sa boîte).",
        "Posez une question ouverte simple sur son organisation actuelle.",
        "Ne mettez jamais de lien Calendly agressif dans le premier message."
      ],
      exampleGood: "Bonjour Claire, j'ai beaucoup aimé ton retour d'expérience sur ton dernier contrat. Par curiosité, comment gères-tu aujourd'hui la régularité de tes publications ?",
      exampleBad: "Bonjour, je suis copywriter, voici mon lien pour réserver 30 minutes de démo dans mon agenda.",
      takeaway: "Une conversation authentique mène naturellement à une proposition commerciale."
    },
    microAction: {
      title: "Personnaliser votre script de premier contact",
      executionTime: "3 min",
      instruction: "Rédigez votre modèle de message court prêt à être adapté.",
      fieldLabel: "Modèle de message d'approche :",
      fieldType: "textarea",
      placeholder: "Bonjour [Prénom], j'ai vu que vous intervenez sur [Sujet]...",
      sampleValue: "Bonjour [Prénom], j'ai lu avec attention ton dernier partage sur ton activité de conseil. Par curiosité, combien de temps passes-tu chaque semaine sur ta présence LinkedIn ?",
      helpTip: "Moins de 50 mots : court, direct et personnalisé."
    },
    deliverableKey: "outreach_script",
    deliverableLabel: "Script d'approche non-intrusif",
    initialStatus: "locked"
  },
  {
    id: 18,
    dayNumber: 18,
    week: 3,
    weekTitle: "Semaine 3 : Décrocher ses 3 premiers clients",
    phaseCode: "prospects",
    title: "L'appel de découverte en 15 minutes",
    subtitle: "Conduire un échange téléphonique efficace avec les 4 questions magiques.",
    durationMinutes: 5,
    badge: "Vente Consultative",
    concept: {
      title: "Écouter 80% du temps, parler 20%",
      readingTime: "2 min",
      summary: "Lors d'un premier appel, le meilleur vendeur n'est pas celui qui a le plus beau discours, mais celui qui pose les meilleures questions. Laissez votre prospect décrire son problème : il vous donnera les arguments exacts pour lui présenter votre solution.",
      keyPoints: [
        "Question 1 : 'Quelle est votre plus grande difficulté sur ce sujet aujourd'hui ?'",
        "Question 2 : 'Qu'avez-vous déjà essayé pour résoudre cela ?'",
        "Question 3 : 'Si tout était idéal dans 3 mois, quel résultat concret aimeriez-vous voir ?'",
        "Question 4 : 'Souhaitez-vous que je vous montre comment on peut mettre ça en place ensemble ?'"
      ],
      exampleGood: "Le prospect parle pendant 12 minutes, vous résumez son besoin en 2 minutes et proposez votre forfait adapté.",
      exampleBad: "Vous présentez des slides pendant 20 minutes sans lui poser une seule question.",
      takeaway: "Vendre, c'est aider quelqu'un à prendre une décision favorable pour lui."
    },
    microAction: {
      title: "Valider votre trame d'appel",
      executionTime: "3 min",
      instruction: "Vérifiez que vous avez mémorisé les 4 questions clés de découverte.",
      fieldLabel: "Trame d'appel de découverte :",
      fieldType: "text",
      placeholder: "4 questions magiques prêtes à l'emploi...",
      sampleValue: "Trame 4 questions validée (Difficulté actuelle > Solutions testées > Objectif idéal > Proposition)",
      helpTip: "Gardez cette antisèche sous les yeux pendant vos appels."
    },
    deliverableKey: "discovery_call_framework",
    deliverableLabel: "Trame d'appel de découverte",
    initialStatus: "locked"
  },
  {
    id: 19,
    dayNumber: 19,
    week: 3,
    weekTitle: "Semaine 3 : Décrocher ses 3 premiers clients",
    phaseCode: "prospects",
    title: "Désamorcer les objections classiques",
    subtitle: "Répondre sereinement à 'C'est trop cher' ou 'Je n'ai pas le temps'.",
    durationMinutes: 5,
    badge: "Objections",
    concept: {
      title: "Une objection est une demande d'information supplémentaire",
      readingTime: "2 min",
      summary: "Quand un prospect dit 'C'est trop cher', il ne dit pas qu'il n'a pas d'argent : il dit qu'il n'a pas encore compris en quoi votre solution va lui rapporter ou lui faire économiser plus que son coût.",
      keyPoints: [
        "Réponse à 'C'est trop cher' : Comparer au coût de ne rien faire (ex: 2 heures perdues par jour représentent 800€ de manque à gagner par mois).",
        "Réponse à 'Je n'ai pas le temps' : Rappeler que votre prestation est justement conçue pour lui libérer du temps sans qu'il ait à s'en occuper.",
        "Validez toujours l'émotion du prospect avec bienveillance avant de recadrer."
      ],
      exampleGood: "'Je comprends tout à fait. Si vous signez un seul client grâce à ces posts, le pack est rentabilisé dès le premier mois, vous êtes d'accord ?'",
      exampleBad: "'Non, ce n'est pas cher du tout par rapport à d'autres'.",
      takeaway: "Transformez le coût en investissement rentable."
    },
    microAction: {
      title: "Rédiger votre réponse à l'objection tarif",
      executionTime: "3 min",
      instruction: "Formulez votre phrase de réponse au doute sur le prix.",
      fieldLabel: "Votre réponse à l'objection de prix :",
      fieldType: "textarea",
      placeholder: "Ex: Je comprends votre prudence. Regardons ensemble ce que vous coûte...",
      sampleValue: "Je comprends tout à fait. L'objectif de ce pack est précisément de vous faire gagner 8h par mois et de générer un contrat qui couvrira plusieurs mois de prestation dès la première signature.",
      helpTip: "Restez toujours calme, posé et souriant."
    },
    deliverableKey: "objection_handling",
    deliverableLabel: "Argumentaire anti-objections",
    initialStatus: "locked"
  },
  {
    id: 20,
    dayNumber: 20,
    week: 3,
    weekTitle: "Semaine 3 : Décrocher ses 3 premiers clients",
    phaseCode: "prospects",
    title: "Le modèle d'accord par email en 1 clic",
    subtitle: "Sécuriser le démarrage de la mission sans paperasse interminable.",
    durationMinutes: 5,
    badge: "Closing",
    concept: {
      title: "Le Bon pour Accord par simple réponse d'email",
      readingTime: "2 min",
      summary: "Pour une première prestation de service entre indépendants ou avec une TPE, un simple récapitulatif par email avec la mention 'Bon pour accord' validée par le client fait office d'accord contractuel valide avant émission de la facture.",
      keyPoints: [
        "Objet d'email limpide : [Projet] - Récapitulatif et validation de notre accord.",
        "Rappel du livrable, du délai de livraison et du tarif forfaitaire.",
        "Phrase de validation : 'Il vous suffit de répondre à cet email avec la mention Bon pour accord pour lancer la mission'."
      ],
      exampleGood: "Email récapitulatif de 10 lignes envoyé dans l'heure suivant l'appel téléphonique.",
      exampleBad: "Attendre 10 jours pour envoyer un contrat complexe de 8 pages trouvé au hasard sur le web.",
      takeaway: "Battez le fer tant qu'il est chaud : envoyez le récapitulatif dans les 2 heures."
    },
    microAction: {
      title: "Sauvegarder votre template de confirmation d'accord",
      executionTime: "3 min",
      instruction: "Vérifiez votre modèle de message de clôture prêt à être envoyé par email.",
      fieldLabel: "Template d'accord par email :",
      fieldType: "text",
      placeholder: "Template email de confirmation prêt...",
      sampleValue: "Template d'accord simplifié prêt à l'emploi (Livrables + Calendrier + Tarif + Bon pour accord)",
      helpTip: "Ce template est disponible dans votre onglet Dossier de projet."
    },
    deliverableKey: "closing_email_template",
    deliverableLabel: "Modèle d'accord simplifié",
    initialStatus: "locked"
  },
  {
    id: 21,
    dayNumber: 21,
    week: 3,
    weekTitle: "Semaine 3 : Décrocher ses 3 premiers clients",
    phaseCode: "prospects",
    title: "Bilan Semaine 3 : Collecter sa première preuve sociale",
    subtitle: "La méthode pour obtenir un avis client 5 étoiles dès la première mission.",
    durationMinutes: 5,
    badge: "Témoignage",
    concept: {
      title: "La boucle de recommandation immédiate",
      readingTime: "2 min",
      summary: "La preuve sociale est le moteur de croissance le plus puissant d'un indépendant. Dès que votre premier client exprime sa satisfaction, sollicitez immédiatement un court témoignage en lui facilitant la tâche.",
      keyPoints: [
        "Posez 3 questions courtes : Quelle était votre situation avant ? Qu'avez-vous pensé de l'accompagnement ? Quel résultat avez-vous obtenu ?",
        "Proposez de rédiger un brouillon de 3 lignes qu'il n'a plus qu'à valider.",
        "Affichez ce témoignage sur votre One-Pager et profil LinkedIn."
      ],
      exampleGood: "'En 2 semaines avec Julien, j'ai clarifié mon offre et signé mon premier contrat à 600€ sans stress !'",
      exampleBad: "'C'était bien merci'.",
      takeaway: "Un témoignage précis vaut 100 arguments commerciaux."
    },
    microAction: {
      title: "Structurer vos 3 questions de recueil d'avis",
      executionTime: "3 min",
      instruction: "Confirmez votre formulaire court de demande de témoignage.",
      fieldLabel: "Questions de recueil de recommandation :",
      fieldType: "text",
      placeholder: "Questions de témoignage prêtes...",
      sampleValue: "Trame de recommandation 3 questions validée pour alimenter la preuve sociale.",
      helpTip: "Vous êtes prêt pour aborder le cadre administratif en Semaine 4 !"
    },
    deliverableKey: "social_proof_framework",
    deliverableLabel: "Protocole de recueil d'avis client",
    initialStatus: "locked"
  },

  // ==========================================
  // SEMAINE 4 : CADRE JURIDIQUE & ADMINISTRATIF SANS STRESS (Jours 22 à 28)
  // ==========================================
  {
    id: 22,
    dayNumber: 22,
    week: 4,
    weekTitle: "Semaine 4 : Formalités et cadre juridique sans jargon",
    phaseCode: "legal",
    title: "Micro-entreprise vs Société : le choix évident",
    subtitle: "Comprendre pourquoi la micro-entreprise est idéale pour démarrer sans risque.",
    durationMinutes: 5,
    badge: "Statut Juridique",
    concept: {
      title: "Zéro chiffre d'affaires = Zéro cotisation",
      readingTime: "2 min",
      summary: "Pour démarrer en solo ou en side-business, la micro-entreprise (auto-entreprise) est le régime le plus simple du monde : création gratuite, comptabilité allégée à un simple livre des recettes, et cotisations calculées uniquement sur les encaissements réels.",
      keyPoints: [
        "Création 100% en ligne sans capital social obligatoire.",
        "Si vous encaissez 0€ un mois, vous payez exactement 0€ de cotisations.",
        "Plafond de chiffre d'affaires très large (jusqu'à 77 700€ pour les prestations de services)."
      ],
      exampleGood: "Micro-entreprise en prestations de services : déclarations mensuelles ou trimestrielles en 3 clics sur l'URSSAF.",
      exampleBad: "Dépenser 1 500€ d'avocat pour créer une SASU complexe avant même d'avoir son premier euro de chiffre d'affaires.",
      takeaway: "La micro-entreprise est le véhicule parfait pour tester et valider sans engagement lourd."
    },
    microAction: {
      title: "Confirmer votre choix de statut pour démarrer",
      executionTime: "3 min",
      instruction: "Sélectionnez le statut retenu pour votre lancement.",
      fieldLabel: "Statut de lancement choisi :",
      fieldType: "options",
      options: [
        "Micro-entreprise (Régime auto-entrepreneur individuel)",
        "Maintien de l'activité en statut actuel (salarié en préparation)",
        "Option société ultérieure dès dépassement des seuils"
      ],
      placeholder: "Sélectionnez votre statut",
      sampleValue: "Micro-entreprise (Régime auto-entrepreneur individuel)",
      helpTip: "95% des apprenants débutent en micro-entreprise pour tester leur idée."
    },
    deliverableKey: "legal_status_choice",
    deliverableLabel: "Choix du statut juridique",
    initialStatus: "locked"
  },
  {
    id: 23,
    dayNumber: 23,
    week: 4,
    weekTitle: "Semaine 4 : Formalités et cadre juridique sans jargon",
    phaseCode: "legal",
    title: "Identifier son code APE et son taux de cotisations",
    subtitle: "Connaître le taux exact de prélèvement social selon votre type d'activité.",
    durationMinutes: 5,
    badge: "Cotisations",
    concept: {
      title: "Les taux officiels de cotisations sociales 2026",
      readingTime: "2 min",
      summary: "En micro-entreprise, le taux de cotisations dépend de votre activité : ~21,1% à 21,2% du CA pour les prestations de services BNC / BIC, et ~12,3% pour la vente de marchandises. Ce taux couvre votre retraite, santé et prévoyance de base.",
      keyPoints: [
        "Prestations de services intellectuels / conseil (BNC) : ~21,1% à 23,1% selon les caisses.",
        "Prestations de services commerciales ou artisanales (BIC) : ~21,2%.",
        "Prélèvement libératoire de l'impôt sur le revenu possible sous condition de ressources (1% à 2,2%)."
      ],
      exampleGood: "Pour 1 000€ encaissés en prestation de conseil, je prévois environ 212€ de cotisations URSSAF.",
      exampleBad: "Penser qu'on va payer 50% de charges dès le premier jour comme une grosse entreprise.",
      takeaway: "Le calcul est direct et transparent : vous connaissez toujours votre net d'avance."
    },
    microAction: {
      title: "Estimer vos charges sociales prévisionnelles",
      executionTime: "3 min",
      instruction: "Renseignez votre catégorie d'activité principale pour estimer votre taux de charges.",
      fieldLabel: "Catégorie d'activité principale :",
      fieldType: "options",
      options: [
        "Prestations de services intellectuelles / Conseil / Digital (BNC ~21,1% - 23,1%)",
        "Prestations de services commerciales / Artisanat (BIC ~21,2%)",
        "Vente de marchandises ou produits physiques (~12,3%)"
      ],
      placeholder: "Sélectionnez votre catégorie",
      sampleValue: "Prestations de services intellectuelles / Conseil / Digital (BNC ~21,1% - 23,1%)",
      helpTip: "Un simulateur complet est accessible dans votre espace."
    },
    deliverableKey: "activity_rate",
    deliverableLabel: "Régime d'activité et taux de charges",
    initialStatus: "locked"
  },
  {
    id: 24,
    dayNumber: 24,
    week: 4,
    weekTitle: "Semaine 4 : Formalités et cadre juridique sans jargon",
    phaseCode: "legal",
    title: "L'ACRE et les exonérations de début d'activité",
    subtitle: "Diviser par deux ses cotisations sociales pendant les 12 premiers mois.",
    durationMinutes: 5,
    badge: "Aides",
    concept: {
      title: "L'ACRE (Aide à la Création ou Reprise d'Entreprise)",
      readingTime: "2 min",
      summary: "Si vous êtes demandeur d'emploi, jeune de moins de 26 ans, ou bénéficiaire de certains minima sociaux, vous êtes éligible à l'ACRE. Elle réduit vos cotisations sociales de 50% pendant vos 12 premiers mois d'activité.",
      keyPoints: [
        "Taux réduit à ~11% au lieu de ~22% pendant un an.",
        "La demande se fait en ligne sur le portail URSSAF auto-entrepreneur dans les 45 jours suivant la création.",
        "Cumulable avec le maintien partiel de l'ARE (allocations chômage) si vous êtes inscrit à France Travail."
      ],
      exampleGood: "Bénéficier de l'ACRE pour ne payer que 11% de charges et réinvestir les économies dans son activité.",
      exampleBad: "Oublier d'envoyer le formulaire de demande ACRE dans les délais de 45 jours.",
      takeaway: "Une aide précieuse pour maximiser votre trésorerie de départ."
    },
    microAction: {
      title: "Vérifier votre éligibilité à l'ACRE",
      executionTime: "3 min",
      instruction: "Indiquez si vous remplissez les conditions d'accès à l'ACRE.",
      fieldLabel: "Éligibilité ACRE pressentie :",
      fieldType: "options",
      options: [
        "Éligible ACRE (Demande à déposer sous 45 jours après immatriculation)",
        "Non éligible (Régime général plein standard)"
      ],
      placeholder: "Sélectionnez votre situation",
      sampleValue: "Éligible ACRE (Demande à déposer sous 45 jours après immatriculation)",
      helpTip: "Vérifiez vos justificatifs auprès de France Travail si nécessaire."
    },
    deliverableKey: "acre_eligibility",
    deliverableLabel: "Statut d'éligibilité ACRE",
    initialStatus: "locked"
  },
  {
    id: 25,
    dayNumber: 25,
    week: 4,
    weekTitle: "Semaine 4 : Formalités et cadre juridique sans jargon",
    phaseCode: "legal",
    title: "La checklist d'immatriculation sur le Guichet Unique",
    subtitle: "Préparer les 4 pièces justificatives pour immatriculer son activité en 15 minutes.",
    durationMinutes: 5,
    badge: "Guichet Unique",
    concept: {
      title: "Les démarches officielles sur formalites.entreprises.gouv.fr",
      readingTime: "2 min",
      summary: "Toutes les immatriculations se font désormais sur le Guichet Unique officiel de l'INPI. Vous n'avez besoin que d'une pièce d'identité avec mention manuscrite, d'un justificatif de domicile et d'une attestation sur l'honneur de non-condamnation.",
      keyPoints: [
        "Pièce 1 : Carte d'identité ou Passeport en cours de validité avec mention 'certifié conforme à l'original' datée et signée.",
        "Pièce 2 : Justificatif de domicile de moins de 3 mois.",
        "Pièce 3 : Déclaration de non-condamnation et de filiation datée et signée.",
        "Numéro SIRET et notification officielle reçus généralement sous 3 à 8 jours ouvrés."
      ],
      exampleGood: "Dossier téléversé en 15 minutes chrono sur le site officiel gratuit sans intermédiaire payant.",
      exampleBad: "Payer 150€ à un site privé trompeur pour une démarche qui est 100% gratuite par l'État.",
      takeaway: "La démarche officielle est simple, gratuite et sécurisée."
    },
    microAction: {
      title: "Vérifier vos pièces justificatives",
      executionTime: "3 min",
      instruction: "Cochez la préparation de votre dossier d'immatriculation.",
      fieldLabel: "État de préparation des pièces :",
      fieldType: "options",
      options: [
        "Pièces prêtes : CNI numérisée + Justificatif de domicile récent",
        "En cours de rassemblement des justificatifs"
      ],
      placeholder: "Sélectionnez votre état",
      sampleValue: "Pièces prêtes : CNI numérisée + Justificatif de domicile récent",
      helpTip: "Votre dossier INPI est presque bouclé !"
    },
    deliverableKey: "inpi_checklist",
    deliverableLabel: "Checklist Guichet Unique INPI",
    initialStatus: "locked"
  },
  {
    id: 26,
    dayNumber: 26,
    week: 4,
    weekTitle: "Semaine 4 : Formalités et cadre juridique sans jargon",
    phaseCode: "legal",
    title: "Compte bancaire dédié & gestion de trésorerie",
    subtitle: "Séparer ses finances pro et perso simplement et sans frais bancaires excessifs.",
    durationMinutes: 5,
    badge: "Banque",
    concept: {
      title: "L'obligation d'un compte dédié séparé",
      readingTime: "2 min",
      summary: "En France, vous devez avoir un compte bancaire dédié à votre activité dès que votre CA dépasse 10 000€ pendant 2 années consécutives. En pratique, ouvrir un compte dédié dès le premier euro (même un compte courant secondaire sans frais) évite tout mélange comptable.",
      keyPoints: [
        "Un compte courant secondaire dédié ou une néobanque pro (ex: Shine, Qonto, BoursoBank, N26).",
        "Tous les encaissements clients arrivent sur ce compte.",
        "Règle d'or : Virer 25% de chaque encaissement sur un sous-compte 'Impôts & Cotisations' pour ne jamais être surpris."
      ],
      exampleGood: "Chaque fois qu'un client verse 500€, j'isole 125€ pour l'URSSAF et je me verse 375€ de revenu net.",
      exampleBad: "Dépenser l'intégralité du chiffre d'affaires sur son compte personnel et paniquer au moment de l'échéance URSSAF.",
      takeaway: "Une discipline simple de 25% mise de côté garantit votre sérénité financière."
    },
    microAction: {
      title: "Définir votre organisation bancaire",
      executionTime: "3 min",
      instruction: "Indiquez la solution bancaire dédiée choisie pour vos encaissements.",
      fieldLabel: "Option bancaire dédiée retenue :",
      fieldType: "text",
      placeholder: "Ex: Compte dédié en néobanque pro...",
      sampleValue: "Compte dédié séparé ouvert avec sous-compte automatique pour la réserve de charges URSSAF (25%).",
      helpTip: "Gardez vos finances pro parfaitement limpides dès le jour 1."
    },
    deliverableKey: "banking_setup",
    deliverableLabel: "Organisation bancaire & Trésorerie",
    initialStatus: "locked"
  },
  {
    id: 27,
    dayNumber: 27,
    week: 4,
    weekTitle: "Semaine 4 : Formalités et cadre juridique sans jargon",
    phaseCode: "legal",
    title: "Modèle de facture conforme en 5 mentions",
    subtitle: "Rédiger sa première facture en toute conformité légale sans logiciel payant.",
    durationMinutes: 5,
    badge: "Facturation",
    concept: {
      title: "Les mentions obligatoires d'une facture de micro-entrepreneur",
      readingTime: "2 min",
      summary: "Une facture valide en micro-entreprise nécessite simplement votre numéro SIRET, vos coordonnées complètes, la date et numéro séquentiel unique, le détail de la prestation et la mention de franchise en base de TVA si vous n'êtes pas assujetti.",
      keyPoints: [
        "Mention obligatoire si non assujetti à TVA : 'TVA non applicable, art. 293 B du CGI'.",
        "Numérotation chronologique continue (ex: FAC-2026-001, FAC-2026-002).",
        "Indication de la date limite de paiement et des pénalités de retard légales (40€ d'indemnité forfaitaire pour les pros)."
      ],
      exampleGood: "Facture FAC-2026-001 émise au format PDF reprenant exactement les 5 mentions réglementaires.",
      exampleBad: "Envoyer un devis griffonné par SMS sans numéro de facture ni mention TVA.",
      takeaway: "Une facture propre inspire confiance et accélère le paiement."
    },
    microAction: {
      title: "Générer la structure de votre facture type",
      executionTime: "3 min",
      instruction: "Confirmez les mentions réglementaires intégrées à votre modèle de facture.",
      fieldLabel: "Mentions légales de facturation :",
      fieldType: "text",
      placeholder: "Structure de facture type conforme...",
      sampleValue: "Modèle de facture conforme validé : Franchise TVA art. 293 B + Numérotation séquentielle + Mentions SIRET.",
      helpTip: "Un modèle de facture prêt à imprimer est disponible dans votre dossier."
    },
    deliverableKey: "invoice_template",
    deliverableLabel: "Modèle de facture réglementaire",
    initialStatus: "locked"
  },
  {
    id: 28,
    dayNumber: 28,
    week: 4,
    weekTitle: "Semaine 4 : Formalités et cadre juridique sans jargon",
    phaseCode: "legal",
    title: "Bilan Semaine 4 : Dossier de création complet",
    subtitle: "La validation finale de tous les voyants administratifs et légaux.",
    durationMinutes: 5,
    badge: "Clôture Légale",
    concept: {
      title: "Votre activité est prête à opérer légalement",
      readingTime: "2 min",
      summary: "Toutes les fondations sont en place : statut choisi, dossier INPI préparé, compte bancaire cadré, facturation conforme prête. Vous disposez d'une structure saine, légère et sécurisée pour vous consacrer à vos clients.",
      keyPoints: [
        "Cadre juridique sécurisé sans risque financier personnel.",
        "Processus de facturation et de déclaration assimilé.",
        "Concentration maximale sur les 2 derniers jours de lancement !"
      ],
      exampleGood: "Tous les voyants légaux sont au vert pour accueillir vos premiers clients.",
      exampleBad: "Laisser la peur de l'administration freiner le passage à l'action.",
      takeaway: "La conformité n'est plus un frein, c'est un tremplin serein."
    },
    microAction: {
      title: "Valider l'achèvement du cadre légal",
      executionTime: "3 min",
      instruction: "Confirmez que votre cadre administratif est totalement prêt.",
      fieldLabel: "Validation du cadre légal :",
      fieldType: "options",
      options: [
        "Dossier légal et administratif complet (Prêt pour le lancement)",
        "Quelques détails à finaliser lors de la déclaration finale"
      ],
      placeholder: "Sélectionnez votre état",
      sampleValue: "Dossier légal et administratif complet (Prêt pour le lancement)",
      helpTip: "Cap sur les 2 derniers jours du parcours !"
    },
    deliverableKey: "legal_package_ready",
    deliverableLabel: "Validation du dossier administratif",
    initialStatus: "locked"
  },

  // ==========================================
  // SPRINT FINAL : LANCEMENT & CÉLÉBRATION (Jours 29 à 30)
  // ==========================================
  {
    id: 29,
    dayNumber: 29,
    week: 5,
    weekTitle: "Sprint Final : Lancement et pérennité",
    phaseCode: "launch",
    title: "La routine quotidienne des 5 minutes d'entretien",
    subtitle: "Comment maintenir l'élan commercial en 5 minutes par jour sur la durée.",
    durationMinutes: 5,
    badge: "Habitude",
    concept: {
      title: "L'effet composé des micro-actions quotidiennes",
      readingTime: "2 min",
      summary: "Une fois lancé, votre succès ne dépend pas de grands coups d'éclat occasionnels, mais de la régularité de vos 5 minutes quotidiennes : envoyer 1 message de relance bienveillant, remercier un client, poster 1 conseil utile.",
      keyPoints: [
        "Lundi : Planifier 1 publication de valeur.",
        "Mardi à Jeudi : Répondre aux commentaires et engager 2 conversations.",
        "Vendredi : Faire le point sur la trésorerie et facturer les missions livrées."
      ],
      exampleGood: "5 minutes chaque matin avec son café pour garder le contact avec son réseau.",
      exampleBad: "Passer 3 semaines sans prospecter puis paniquer quand un contrat se termine.",
      takeaway: "La régularité bat l'intensité à tous les coups."
    },
    microAction: {
      title: "Choisir votre créneau quotidien de 5 minutes",
      executionTime: "3 min",
      instruction: "Définissez le moment de la journée dédié à votre routine de maintien.",
      fieldLabel: "Votre créneau de routine quotidienne :",
      fieldType: "options",
      options: [
        "Le matin avec le café (8h30 - 8h35)",
        "Pendant la pause déjeuner (12h45 - 12h50)",
        "En début de soirée après le travail (18h30 - 18h35)"
      ],
      placeholder: "Choisissez votre créneau",
      sampleValue: "Le matin avec le café (8h30 - 8h35)",
      helpTip: "Le matin est souvent le moment le plus propice et sans interruption."
    },
    deliverableKey: "daily_routine_slot",
    deliverableLabel: "Créneau de routine quotidienne",
    initialStatus: "locked"
  },
  {
    id: 30,
    dayNumber: 30,
    week: 5,
    weekTitle: "Sprint Final : Lancement et pérennité",
    phaseCode: "launch",
    title: "Célébration du lancement & Certificat d'Accomplissement",
    subtitle: "Bilan des 30 jours, téléchargement du Dossier Projet et passage officiel à l'action.",
    durationMinutes: 5,
    badge: "Victoire 30 Jours",
    concept: {
      title: "Vous êtes passé de l'idée au projet prêt à encaisser",
      readingTime: "2 min",
      summary: "En 30 sessions de 5 minutes (soit seulement 2h30 d'investissement au total), vous avez accompli ce que 80% des personnes remettent à plus tard pendant des années : vous avez une offre claire, un tarif fixé, vos premiers prospects identifiés et un cadre légal maîtrisé.",
      keyPoints: [
        "30 micro-actions validées = un dossier de création d'activité complet.",
        "Déblocage de votre Certificat d'Accomplissement CinqMinutes.",
        "Export intégral de votre Dossier de Création en PDF / Markdown."
      ],
      exampleGood: "Télécharger son dossier de projet complet et envoyer sa première proposition commerciale aujourd'hui.",
      exampleBad: "Attendre le moment parfait qui n'arrive jamais.",
      takeaway: "Le meilleur moment pour démarrer était hier. Le second meilleur moment, c'est aujourd'hui."
    },
    microAction: {
      title: "Générer et exporter votre dossier de projet",
      executionTime: "3 min",
      instruction: "Validez la complétion de votre parcours et téléchargez la synthèse complète.",
      fieldLabel: "Bilan personnel de fin de parcours :",
      fieldType: "textarea",
      placeholder: "Votre sentiment après avoir franchi ces 30 étapes...",
      sampleValue: "Projet structuré de bout en bout en 5 minutes par jour. Offre claire, premiers contacts établis et micro-entreprise prête à opérer !",
      helpTip: "Bravo ! Vous faites partie des 20% qui vont jusqu'au bout."
    },
    deliverableKey: "final_project_summary",
    deliverableLabel: "Bilan global du parcours 30 jours",
    initialStatus: "locked"
  }
];

export const DEMO_PROFILES = [
  {
    id: "julien_freelance",
    name: "Julien M.",
    role: "Cadre salarié → Side Project Freelance & Conseil",
    avatar: "JM",
    projectTitle: "Conseil & Copywriting B2B pour Indépendants",
    currentDay: 8,
    streakDays: 5,
    completedDays: [1, 2, 3, 4, 5, 6, 7],
    xp: 350,
    badge: "Stratège de l'offre",
  },
  {
    id: "sarah_artisan",
    name: "Sarah L.",
    role: "En reconversion → Activité de Coaching & Ateliers",
    avatar: "SL",
    projectTitle: "Ateliers & Accompagnement Bien-être",
    currentDay: 14,
    streakDays: 12,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    xp: 650,
    badge: "Bâtisseuse confirmée",
  }
];
