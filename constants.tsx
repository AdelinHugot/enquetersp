import { Question } from './types';

export const QUESTIONS_DECOUVERTE: Question[] = [
  // --- ÉTAPE 0 : IDENTIFICATION DE L'AGENT ---
  {
    id: 'agent_selection',
    section: 'Identification',
    text: 'Qui réalise cette étude aujourd\'hui ?',
    type: 'single',
    layout: 'grid',
    options: [
      { 
        id: 'morgan_legal', 
        label: 'Morgan LEGAL', 
        image: 'https://www.rhonesolairepro.com/wp-content/uploads/2024/09/FXDriant-RSP_portraits-26-scaled-aspect-ratio-160-260.jpg' 
      },
      { 
        id: 'pierre_bourgeois', 
        label: 'Pierre BOURGEOIS', 
        image: 'https://www.rhonesolairepro.com/wp-content/uploads/2024/08/FXDriant-RSP_portraits-19-scaled-aspect-ratio-160-260-1.jpg' 
      },
      { 
        id: 'laurent_malerba', 
        label: 'Laurent MALERBA', 
        image: 'https://www.rhonesolairepro.com/wp-content/uploads/2024/08/FXDriant-RSP_portraits-9-scaled-aspect-ratio-160-260-4.jpg' 
      },
      { 
        id: 'jean_christophe', 
        label: 'Jean-Christophe', 
        image: '/jean-christophe.jpeg' 
      }
    ],
    required: true
  },

  // --- PHASE 1 : INFORMATIONS PERSONNELLES ---
  {
    id: 'temps_habitation',
    section: 'Découverte',
    text: 'Depuis combien de temps habitez-vous ici ?',
    type: 'text',
    placeholder: 'Ex: 5 ans',
    required: true
  },
  {
    id: 'metier',
    section: 'Découverte',
    text: 'Quel est votre métier ?',
    type: 'text',
    placeholder: 'Votre profession...',
    required: true
  },
  {
    id: 'tranche_age',
    section: 'Découverte',
    text: 'Quel âge avez-vous ?',
    type: 'single',
    layout: 'grid',
    options: [
      { id: '25-35', label: '25 - 35 ans' },
      { id: '36-50', label: '36 - 50 ans' },
      { id: '51-65', label: '51 - 65+ ans' }
    ],
    required: true
  },

  // --- PHASE 2 : STATUT DU PROJET ---
  {
    id: 'avancement_projet',
    section: 'Découverte',
    text: 'Où en êtes-vous dans votre projet ?',
    type: 'single',
    layout: 'grid',
    options: [
      { id: 'projet_imminent', label: 'Projet imminent' },
      { id: 'decouverte', label: 'Découverte' },
      { id: 'compare', label: 'Je compare plusieurs installateurs' }
    ],
    required: true
  },
  {
    id: 'concerne_quoi',
    section: 'Découverte',
    text: 'Votre projet concerne principalement :',
    type: 'single',
    layout: 'grid',
    options: [
      { id: 'maison', label: 'Maison individuelle' },
      { id: 'societe', label: 'Société' },
      { id: 'autre', label: 'Autre', hasInput: true }
    ],
    required: true
  },

  // --- PHASE 3 : PROFIL ÉNERGÉTIQUE ---
  {
    id: 'consommation_actuelle',
    section: 'Découverte',
    text: 'Quelle est votre consommation annuelle ?',
    type: 'consumption',
    required: true
  },
  {
    id: 'evolution_consommation',
    section: 'Découverte',
    text: 'Avez-vous prévu une évolution de consommation dans l\'année ?',
    type: 'multiple',
    layout: 'grid',
    options: [
      { id: 'rien', label: '🚫 Rien de prévu' },
      { id: 'voiture_elec', label: '🚗 Voiture élec' },
      { id: 'piscine', label: '🏊 Piscine' },
      { id: 'clim', label: '❄️ Climatisation' },
      { id: 'chauffage', label: '🌡️ Chauffage / ECS' },
      { id: 'spa', label: '🧖 SPA' },
      { id: 'autre', label: '➕ Autre', hasInput: true }
    ],
    required: true
  },
  {
    id: 'fournisseur_actuel',
    section: 'Découverte',
    text: 'Quel est votre fournisseur actuel ?',
    type: 'text',
    placeholder: 'EDF, Engie, TotalEnergies...',
    required: true
  },
  {
    id: 'deja_change_fournisseur',
    section: 'Découverte',
    text: 'Avez-vous déjà changé de fournisseur ?',
    type: 'single',
    options: [
      { id: 'oui', label: 'Oui' },
      { id: 'non', label: 'Non' }
    ],
    required: true
  },
  {
    id: 'connaissance_stockage_surplus',
    section: 'Découverte',
    text: 'Connaissez-vous les différentes façons de stocker votre surplus solaire ?',
    type: 'multiple',
    layout: 'grid',
    options: [
      { id: 'revente', label: 'Revente' },
      { id: 'batterie_physique', label: 'Batterie physique' },
      { id: 'batterie_virtuelle', label: 'Batterie virtuelle' },
      { id: 'rien', label: 'Rien de tout ça' }
    ],
    required: true
  },

  // --- PHASE 4 : MOTIVATIONS ET ATTENTES ---
  {
    id: 'motivations_priorite',
    section: 'Découverte',
    text: 'Pourquoi voulez-vous poser des panneaux photovoltaïques ?',
    type: 'priority',
    options: [
      { id: 'facture', label: 'Réduction de la facture' },
      { id: 'independance', label: 'Indépendance énergétique' },
      { id: 'valorisation', label: 'Valorisation maison' },
      { id: 'ecologie', label: 'Démarche écologique' }
    ],
    required: true
  },
  {
    id: 'attentes_partenaire',
    section: 'Découverte',
    text: 'Quelles sont vos priorités dans ce projet ?',
    type: 'multiple',
    layout: 'grid',
    options: [
      { id: 'qualite', label: 'Qualité' },
      { id: 'reactivite', label: 'Réactivité' },
      { id: 'transparence', label: 'Transparence' },
      { id: 'confiance', label: 'Confiance' },
      { id: 'securite', label: 'Sécurité' },
      { id: 'expertise', label: 'Expertise Métier' },
      { id: 'prix', label: 'Prix' }
    ],
    required: true
  },
  {
    id: 'attentes_rdv',
    section: 'Découverte',
    text: 'Qu’attendez-vous de ce rendez-vous aujourd’hui ?',
    type: 'multiple',
    layout: 'grid',
    options: [
      { id: 'rentabilite', label: 'Rentabilité' },
      { id: 'etude_energetique', label: 'Une étude énergétique' },
      { id: 'etude_financiere', label: 'Une étude financière' },
      { id: 'devis', label: 'Un devis' },
      { id: 'bon_partenaire', label: 'Trouver le bon partenaire' },
      { id: 'securite', label: 'De la sécurité' }
    ],
    required: true
  },

  // --- PHASE 5 : FREINS ET PSYCHOLOGIE ---
  {
    id: 'pourquoi_pas_plus_tot',
    section: 'Découverte',
    text: 'Pourquoi ne pas avoir réalisé ce projet plus tôt ?',
    type: 'multiple',
    layout: 'grid',
    options: [
      { id: 'budget', label: 'Budget' },
      { id: 'prestataire', label: 'Pas le bon prestataire' },
      { id: 'pense', label: 'Pas pensé' },
      { id: 'reputation', label: 'Mauvaise réputation' },
      { id: 'rentable', label: 'Pas rentable' },
      { id: 'autre', label: 'Autre', hasInput: true }
    ],
    required: true
  },
  {
    id: 'freins_specifiques',
    section: 'Découverte',
    text: 'Quels sont vos freins aujourd’hui ?',
    type: 'multiple',
    layout: 'grid',
    options: [
      { id: 'aucun', label: 'Aucun' },
      { id: 'prix', label: 'Le prix' },
      { id: 'esthetique', label: 'Pas esthétique' },
      { id: 'etancheite', label: 'Problème d’étanchéité' },
      { id: 'incendie', label: 'Peur des incendies' },
      { id: 'sous_traitance', label: 'Crainte de la sous-traitance' },
      { id: 'experience', label: 'Mauvaise expérience avec des artisans' },
      { id: 'recyclage', label: 'Recyclage des panneaux' }
    ],
    required: true
  },
  {
    id: 'point_plus_important',
    section: 'Découverte',
    text: 'Quel est le point le plus important pour vous ?',
    type: 'single',
    layout: 'grid',
    options: [
      { id: 'prix', label: 'Prix' },
      { id: 'qualite', label: 'Qualité' },
      { id: 'local', label: 'Local' },
      { id: 'sous_traitance', label: 'Pas de sous-traitance' },
      { id: 'service', label: 'Service' },
      { id: 'reactivite', label: 'Réactivité/Délais' }
    ],
    required: true
  },

  // --- PHASE 6 : CONCURRENCE ---
  {
    id: 'deja_etudes_pv',
    section: 'Découverte',
    text: 'Avez-vous déjà fait d’autres études photovoltaïques ?',
    type: 'single',
    options: [
      { id: 'oui', label: 'Oui' },
      { id: 'non', label: 'Non' }
    ],
    required: true
  },
  {
    id: 'etudes_pv_qui',
    section: 'Découverte',
    text: 'Chez qui avez-vous fait ces études ?',
    type: 'text',
    placeholder: 'Nom de l\'installateur ou entreprise...',
    required: false
  },
  {
    id: 'etudes_pv_pourquoi_pas_signe',
    section: 'Découverte',
    text: 'Pourquoi ne pas les avoir signées ?',
    type: 'long-text',
    placeholder: 'Raisons du refus ou de l\'hésitation...',
    required: false
  },

  // --- PHASE 7 : BUDGET ET FINANCEMENT ---
  {
    id: 'connaissance_budgets',
    section: 'Découverte',
    text: 'Connaissez-vous les budgets pour ce type d’installation ?',
    type: 'single',
    layout: 'grid',
    options: [
      { id: 'moins_10k', label: 'Moins de 10 000€' },
      { id: 'moins_15k', label: 'Moins de 15 000€' },
      { id: 'moins_20k', label: 'Moins de 20 000€' },
      { id: 'plus_20k', label: 'Plus de 20 000€' },
      { id: 'unknown', label: 'Je ne sais pas' }
    ],
    required: true
  },
  {
    id: 'budget_prevu',
    section: 'Découverte',
    text: 'Avez-vous prévu un budget pour votre projet ?',
    type: 'single',
    options: [
      { id: 'oui', label: 'Oui', hasInput: true, inputPlaceholder: 'Montant prévu en €...' },
      { id: 'non', label: 'Non' }
    ],
    required: true
  },
  {
    id: 'financement_envisage',
    section: 'Découverte',
    text: 'Comment envisagez-vous le financement de votre projet ?',
    type: 'single',
    layout: 'grid',
    options: [
      { id: 'comptant', label: 'Comptant' },
      { id: 'financement', label: 'Financement' },
      { id: 'mix', label: 'Mix' },
      { id: 'indiscret', label: 'Indiscret' }
    ],
    required: true
  },

  // --- PHASE 8 : TIMING ET FINALISATION ---
  {
    id: 'echeance_installation',
    section: 'Découverte',
    text: 'Si le projet correspond à vos attentes, quand souhaiteriez-vous réaliser votre installation photovoltaïque ?',
    type: 'single',
    layout: 'grid',
    options: [
      { id: 'immediat', label: 'Immédiatement' },
      { id: '1_mois', label: '1 mois' },
      { id: '3_mois', label: '3 mois' },
      { id: '6_mois', label: '6 mois' },
      { id: 'in_year', label: 'Dans l\'année' }
    ],
    required: true
  },
  {
    id: 'comment_connu',
    section: 'Découverte',
    text: 'Comment nous avez-vous connu ?',
    type: 'single',
    layout: 'grid',
    options: [
      { id: 'parrainage', label: 'Parrainage' },
      { id: 'reseaux', label: 'Réseaux sociaux' },
      { id: 'google', label: 'Recherche Google' },
      { id: 'autre', label: 'Autre', hasInput: true }
    ],
    required: true
  }
];

export const QUESTIONS_RS: Question[] = [
  {
    id: 'agent_selection',
    section: 'Identification',
    text: 'Qui réalise cette étude aujourd\'hui ?',
    type: 'single',
    layout: 'grid',
    options: [
      { 
        id: 'morgan_legal', 
        label: 'Morgan LEGAL', 
        image: 'https://www.rhonesolairepro.com/wp-content/uploads/2024/09/FXDriant-RSP_portraits-26-scaled-aspect-ratio-160-260.jpg' 
      },
      { 
        id: 'pierre_bourgeois', 
        label: 'Pierre BOURGEOIS', 
        image: 'https://www.rhonesolairepro.com/wp-content/uploads/2024/08/FXDriant-RSP_portraits-19-scaled-aspect-ratio-160-260-1.jpg' 
      },
      { 
        id: 'laurent_malerba', 
        label: 'Laurent MALERBA', 
        image: 'https://www.rhonesolairepro.com/wp-content/uploads/2024/08/FXDriant-RSP_portraits-9-scaled-aspect-ratio-160-260-4.jpg' 
      },
      { 
        id: 'jean_christophe', 
        label: 'Jean-Christophe', 
        image: '/jean-christophe.jpeg' 
      }
    ],
    required: true
  },
  {
    id: 'social_usage',
    section: 'Perception des Réseaux',
    text: 'Quels réseaux sociaux utilisez-vous régulièrement ?',
    type: 'multiple',
    layout: 'grid',
    options: [
      { id: 'facebook', label: 'Facebook' },
      { id: 'instagram', label: 'Instagram' },
      { id: 'linkedin', label: 'Linkedin' },
      { id: 'tiktok', label: 'Tiktok' },
      { id: 'youtube', label: 'Youtube' },
      { id: 'autre', label: 'Autre', hasInput: true }
    ],
    required: true
  },
  {
    id: 'is_subscribed',
    section: 'Perception des Réseaux',
    text: 'Suivez-vous Rhône Solaire Pro sur l\'une de ces plateformes ?',
    type: 'multiple',
    layout: 'grid',
    options: [
      { id: 'facebook', label: 'Facebook' },
      { id: 'instagram', label: 'Instagram' },
      { id: 'linkedin', label: 'Linkedin' },
      { id: 'tiktok', label: 'Tiktok' },
      { id: 'youtube', label: 'Youtube' },
      { id: 'aucun', label: 'Aucun pour le moment' }
    ],
    required: true
  },
  {
    id: 'content_frequency',
    section: 'Perception des Réseaux',
    text: 'À quelle fréquence voyez-vous nos publications ?',
    type: 'single',
    options: [
      { id: 'daily', label: 'Quotidiennement' },
      { id: 'weekly', label: 'Une fois par semaine' },
      { id: 'monthly', label: 'Rarement' },
      { id: 'never', label: 'Jamais vu' }
    ],
    required: true
  },
  {
    id: 'clarity_score',
    section: 'Perception des Réseaux',
    text: 'Trouvez-vous que nos contenus sont clairs et pédagogiques ?',
    type: 'scale',
    options: [
      { id: '1', label: 'Pas du tout' },
      { id: '2', label: 'Peu' },
      { id: '3', label: 'Neutre' },
      { id: '4', label: 'Assez' },
      { id: '5', label: 'Tout à fait' }
    ],
    required: true
  },
  {
    id: 'reassurance_score',
    section: 'Perception des Réseaux',
    text: 'Nos publications renforcent-elles votre confiance envers Rhône Solaire Pro ?',
    type: 'scale',
    options: [
      { id: '1', label: 'Pas du tout' },
      { id: '2', label: 'Un peu' },
      { id: '3', label: 'Moyennement' },
      { id: '4', label: 'Beaucoup' },
      { id: '5', label: 'Énormément' }
    ],
    required: true
  },
  {
    id: 'comm_tone',
    section: 'Perception des Réseaux',
    text: 'Que pensez-vous de notre ton de communication ?',
    type: 'single',
    layout: 'grid',
    options: [
      { id: 'tech', label: 'Trop technique' },
      { id: 'balanced', label: 'Équilibré et pro' },
      { id: 'comm', label: 'Trop publicitaire' },
      { id: 'light', label: 'Pas assez sérieux' }
    ],
    required: true
  },
  {
    id: 'rs_role',
    section: 'Perception des Réseaux',
    text: 'Quel est l\'impact principal de nos réseaux sur votre parcours client ?',
    type: 'multiple',
    layout: 'grid',
    options: [
      { id: 'trust', label: 'Instaurer la confiance' },
      { id: 'understand', label: 'Comprendre la technique' },
      { id: 'rentability', label: 'Visualiser les économies' },
      { id: 'diff', label: 'Nous différencier des autres' },
      { id: 'learn_more', label: 'Donner envie de sauter le pas' }
    ],
    required: true
  },
  {
    id: 'preferred_topics',
    section: 'Perception des Réseaux',
    text: 'Quels sujets liés au solaire aimeriez-vous voir sur les réseaux sociaux ?',
    type: 'multiple',
    layout: 'grid',
    options: [
      { id: 'rentability', label: 'Rentabilité et économies' },
      { id: 'operation', label: 'Fonctionnement d’une installation' },
      { id: 'regulations', label: 'Aides et réglementations' },
      { id: 'misconceptions', label: 'Idées reçues / arnaques' },
      { id: 'feedback', label: 'Retours d’expérience clients' },
      { id: 'news', label: 'Actualités du secteur' },
      { id: 'autre', label: 'Autre', hasInput: true }
    ],
    required: true
  },
  {
    id: 'preferred_formats',
    section: 'Perception des Réseaux',
    text: 'Sous quel format préférez-vous consulter ce type d’informations ?',
    type: 'multiple',
    layout: 'grid',
    options: [
      { id: 'short_videos', label: 'Vidéos courtes' },
      { id: 'explainer_videos', label: 'Vidéos explicatives' },
      { id: 'carousels', label: 'Publications pédagogiques (carrousels)' },
      { id: 'testimonials', label: 'Témoignages clients' },
      { id: 'tips', label: 'Conseils pratiques' },
      { id: 'synthetic', label: 'Contenus synthétiques et faciles à comprendre' }
    ],
    required: true
  },
  {
    id: 'improvement_suggestion',
    section: 'Perception des Réseaux',
    text: 'Quelle thématique aimeriez-vous voir davantage sur nos réseaux ?',
    type: 'long-text',
    placeholder: 'Réalisations clients, conseils d\'entretien, actus du secteur...',
    required: false
  }
];