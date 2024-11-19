ALGEBRA = 'algebra'
ASTRONOMY = 'astronomy'
BIOCHEMISTRY = 'biochemistry'
BIOLOGY = 'biology'
BOTANY = 'botany'
BUSINESS = 'business'
CALCULUS = 'calculus'
CHEMISTRY = 'chemistry'
COMPUTER = 'computer'
DIFFERENT = 'different'
ELECTRICITY = 'electricity'
ENGINEERING = 'engineering'
ENVIRONMENT = 'environment'
ESL = 'ESL'
GEOGRAPHY = 'geography'
GEOLOGY = 'geology'
GEOMETRY = 'geometry'
GOVERNMENT = 'government'
HEALTH = 'health'
HISTORY = 'history'
LANGUAGE = 'language'
LAW = 'law'
MARKETING = 'marketing'
MATH = 'math'
NUCLEAR = 'nuclear'
PHYSICS = 'physics'
PROBABILITY = 'probability'
QUANTUM = 'quantum'
RELATIVITY = 'relativity'
SCIENCE = 'science'
SOCIAL = 'social'
STATISTIC = 'statistic'
TRIGONOMETRY = 'trigonometry'

CATEGORY_CHOICES = (
    (ALGEBRA, 'Algebra'),
    (ASTRONOMY, 'Astronomy'),
    (BIOCHEMISTRY, 'Biochemistry'),
    (BIOLOGY, 'Biology'),
    (BOTANY, 'Botany'),
    (BUSINESS, 'Business'),
    (CALCULUS, 'Calculus'),
    (CHEMISTRY, 'Chemistry'),
    (COMPUTER, 'Computer'),
    (DIFFERENT, 'Different'),
    (ELECTRICITY, 'Electricity'),
    (ENGINEERING, 'Engineering'),
    (ENVIRONMENT, 'Environment'),
    (ESL, 'ESL'),
    (GEOGRAPHY, 'Geography'),
    (GEOLOGY, 'Geology'),
    (GEOMETRY, 'Geometry'),
    (GOVERNMENT, 'Government'),
    (HEALTH, 'Health'),
    (HISTORY, 'History'),
    (LANGUAGE, 'Language'),
    (LAW, 'Law'),
    (MARKETING, 'Marketing'),
    (MATH, 'Math'),
    (NUCLEAR, 'Nuclear'),
    (PHYSICS, 'Physics'),
    (PROBABILITY, 'Probability'),
    (QUANTUM, 'Quantum'),
    (RELATIVITY, 'Relativity'),
    (SCIENCE, 'Science'),
    (SOCIAL, 'Social'),
    (STATISTIC, 'Statistic'),
    (TRIGONOMETRY, 'Trigonometry'),
)

CATEGORIES = {
    ALGEBRA: {
        'data': ('algebra', 'al', 'alg', 'algb'),
        'count': 8,
    },
    ASTRONOMY: {
        'data': ('astronomy', 'astrology', 'space', 'ast', 'astr', 'astrophysics', 'astro', 'astros', 'cosmology', 'extragalactic'),
        'count': 22,
    },
    BIOCHEMISTRY: {
        'data': ('biochemistry', 'biochem', 'bio-chem', 'bio-chemistry', 'organic', 'inorganic', 'bc'),
        'count': 10,
    },
    BIOLOGY: {
        'data': ('biology', 'cell', 'genetics', 'cellular', 'ecology', 'forensic', 'physiology', 'anatomy', 'bio', 'ecology', 'cells', 'gen', 'cell', 'anat', 'biological', 'bs'),
        'count': 22,
    },
    BOTANY: {
        'data': ('botany', 'agriculture', 'ag', 'agr', 'bot'),
        'count': 14,
    },
    BUSINESS: {
        'data': ('business', 'accounting', 'economy', 'economics', 'finance', 'management', 'consumer', 'entrepreneur', 'entrepreneurial', 'biz', 'bus', 'econ', 'acc', 'ent', 'buss', 'economies', 'consumers', 'entreprenuers'),
        'count': 10,
    },
    CALCULUS: {
        'data': ('calculus', 'calc', 'cal', 'pc'),
        'count': 12,
    },
    CHEMISTRY: {
        'data': ('chemistry', 'chemical', 'chem'),
        'count': 25,
    },
    COMPUTER: {
        'data': ('computer', 'computer science', 'it', ' it', 'information', 'technology', 'graphic', 'web', 'website', 'processing', 'keyboard', 'keyboarding', 'computational', 'coding', 'comp', 'code', 'tech', 'info', 'key', 'keyb'),
        'count': 15,
    },
    ELECTRICITY: {
        'data': ('electricity', 'magnetism', 'electromagnetism', 'electrical', 'electric', 'magnet', 'circuits', 'ee', 'em', 'circuit', 'electrodynamics', 'electromag'),
        'count': 14,
    },
    ENGINEERING: {
        'data': ('engineering', 'mechanical', 'civil', ),
        'count': 16,
    },
    ENVIRONMENT: {
        'data': ('environmental', 'environment', 'sustainable', 'sustainability', 'env', 'ev', 'environments'),
        'count': 15,
    },
    ESL: {
        'data': ('esl', 'ell'),
        'count': 7,
    },
    GEOGRAPHY: {
        'data': ('geography', 'earth', 'terrestrial', 'geo', 'earths', 'es'),
        'count': 19,
    },
    GEOLOGY: {
        'data': ('geology', 'geol', 'soil'),
        'count': 18,
    },
    GEOMETRY: {
        'data': ('geometry', 'shapes', 'shape', 'geom'),
        'count': 13,
    },
    GOVERNMENT: {
        'data': ('government', 'governmental', 'gov', 'govn', 'governments'),
        'count': 17,
    },
    HEALTH: {
        'data': ('pe', 'physical', 'sport', 'sports', 'health', 'phys-ed', 'nutrition', 'kin', 'kinesiology'),
        'count': 16,
    },
    HISTORY: {
        'data': ('history', 'civilization', 'his', 'hist', 'civ', 'civilizations', 'civs', 'hs'),
        'count': 15,
    },
    LANGUAGE: {
        'data': ('literacy', 'english', 'language', 'writing', 'reading', 'grammar', 'vocabulary', 'communication', 'composition', 'humanities', 'literature', 'journalism', 'poetry', 'eng', 'es', 'vocab', 'comm', 'com', 'languages', 'vocabs', 'compositions', 'humanity', 'lit'),
        'count': 18,
    },
    LAW: {
        'data': ('law', 'politics', 'debate', 'criminal', 'legal', 'justice'),
        'count': 8,
    },
    MARKETING: {
        'data': ('marketing', 'mkt', 'mark'),
        'count': 8,
    },
    MATH: {
        'data': ('math', 'arithmetic', 'mathematics', 'maths', 'mt', 'mth', 'arithmitic', 'analytical'),
        'count': 19,
    },
    NUCLEAR: {
        'data': ('nuclear', 'np', 'nucl'),
        'count': 9,
    },
    PHYSICS: {
        'data': ('physics', 'mechanics', 'newtonian', 'classical', 'energy', 'phys', 'newton'),
        'count': 25,
    },
    PROBABILITY: {
        'data': ('probability', 'probabilities', 'prob'),
        'count': 5,
    },
    QUANTUM: {
        'data': ('quantum', 'qp', 'quan', 'solid'),
        'count': 4,
    },
    RELATIVITY: {
        'data': ('relativity', 'rel'),
        'count': 11,
    },
    SCIENCE: {
        'data': ('science', 'sc', 'sci', 'sciences', 'scientific', 'experiment', 'experimental'),
        'count': 37,
    },
    SOCIAL: {
        'data': ('social', 'socials', 'culture', 'cultures', 'anthropology', 'civics', 'ss'),
        'count': 9,
    },
    STATISTIC: {
        'data': ('statistics', 'statistic', 'stats', 'statistical'),
        'count': 11,
    },
    TRIGONOMETRY: {
        'data': ('trigonometry', 'trig', 'triginometry'),
        'count': 14,
    },
    DIFFERENT: {
        'data': [],
        'count': 25,
    }
}
