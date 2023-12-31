const hardWordsArray = [
    "abound", "adulterate", "abate", "abstain", "aloof", "admonish", "appease",
    "amorphous", "advocate", "abjure", "approbation", "clangor", "aesthetic", "arbitrary",
    "austere", "aggrandize", "anomalous", "cherish", "conventional", "affectation", "archaic",
    "loquacious", "contrite", "compelling", "pedantic", "marginalize", "specious", "plastic",
    "misanthropic", "convoluted", "contend", "placid", "panache", "spurious", "platitude",
    "misnomer", "covet", "copious", "polemical", "plodding", "subjective", "prescient",
    "negligent", "craven", "cosmopolitan", "precipitate", "prosaic", "subvert", "pristine",
    "obsequious", "decorum", "deference", "profundity", "remedial", "timorous", "reproach",
    "placate", "deft", "desultory", "prophetic", "restive", "tortuous", "robust",
    "proclivity", "demur", "diffident", "prudent", "sporadic", "tractable", "salubrious",
    "puerile", "derivative", "dilatory", "punctilious", "stigmatize", "transient", "sanction",
    "quixotic", "desiccate", "equivocate", "recondite", "undermine", "ubiquitous", "sedulous",
    "spendthrift", "diatribe", "polarize", "scrupulous", "utterly", "underscore", "soporific",
    "taciturn", "incredulous", "prodigal", "tranquil", "weary", "venal", "stern",
    "wary", "ingenuous", "verbose", "vacillate", "zealous", "venerate", "tendentious",
    "abhor", "acrimonious", "affinity", "acquiesce", "alienate", "antedate", "acclaim",
    "boisterous", "belligerent", "altruistic", "adroit", "apathy", "banish", "ascertain",
    "chivalrous", "beneficent", "baroque", "amend", "apropos", "bridle", "assertive",
    "churlish", "canny", "byzantine", "animus", "apt", "comply", "bogus",
    "clandestine", "cavalier", "compromise", "apologist", "cloak", "crestfallen", "cataclysmic",
    "complacent", "distressed", "conciliatory", "astringent", "consensus", "curtail", "circumscribe",
    "cumbersome", "dwindling", "countenance", "collaborate", "distort", "elucidate", "complementary",
    "debilitating", "eclipse", "covert", "competent", "divergent", "evade", "contentious",
    "deliberate", "encyclopedic", "credible", "correlate", "elated", "feckless", "disingenuous",
    "droll", "exacerbate", "diffuse", "deride", "enchant", "fester", "divulge", "abject", "arresting", "allusive", "assail", "adept", "apprehension", "antagonize",
    "amicable", "chastise", "astute", "benevolent", "adverse", "ardent", "barren",
    "animosity", "cumbersome", "commence", "berate", "appropriate", "axiomatic", "bombastic",
    "aver", "economy", "convalescent", "buoyant", "archetype", "cease", "cajole",
    "barrage", "elementary", "curb", "buttress", "articulate", "conducive", "chary",
    "cathartic", "embellish", "decry", "condone", "auspicious", "corporeal", "curmudgeon",
    "decipher", "euphoric", "duress", "contravene", "bereft", "doctrinaire", "dirge",
    "delusion", "exonerate", "evoke", "denounce", "captious", "eclectic", "estimable", "beguile", "depravity", "boon", "dilettante", "callous", "effrontery", "coddle",
    "encroach", "crescendo", "endow", "extenuating", "entreat", "frenetic", "gregarious",
    "fringe", "indictment", "hapless", "indignant", "immaculate", "ineluctable", "obfuscate",
    "inquisitive", "ossify", "latitude", "pastiche", "levity", "perspicacious", "malevolent",
    "ponderous", "mediate", "recluse", "occlude", "retaliate", "pacify", "rhapsody",
    "paragon", "serendipitous", "patronize", "shirk", "penurious", "sinecure", "piquant",
    "sinuous", "rampant", "remote", "stanch", "reprobate", "surfeit", "turbid",
    "ulterior", "turgid", "voluble", "vacuous", "abrogate", "abstruse", "aghast", "auxiliary", "apprise", "caricature", "beguile",
    "depravity", "boon", "dilettante", "callous", "effrontery", "coddle", "encroach",
    "crescendo", "endow", "extenuating", "entreat", "frenetic", "gregarious", "fringe",
    "indictment", "hapless", "indignant", "immaculate", "ineluctable", "obfuscate", "inquisitive",
    "ossify", "latitude", "pastiche", "levity", "perspicacious", "malevolent", "ponderous",
    "mediate", "recluse", "occlude", "retaliate", "pacify", "rhapsody", "paragon",
    "serendipitous", "patronize", "shirk", "penurious", "sinecure", "piquant", "sinuous",
    "rampant", "remote", "stanch", "reprobate", "surfeit", "turbid", "ulterior",
    "turgid", "voluble", "vacuous",
    "zephyr", "zealot", "zeal", "yoke", "yawn", "xenophobe", "xenophile",
    "wrath", "wrought", "wrest", "wrench", "wretched", "wry", "writhe",
    "voracious", "vocation", "vitriolic", "vital", "virulence", "virile", "vindictive",
    "vindicate", "vigilance", "viable", "veritable", "verdant", "veneer", "vehement",
    "vector", "vanquish", "valor", "validate", "vacillate", "usurp", "uplift",
    "upheaval", "unyielding", "unwitting", "unveil", "unprecedented", "unorthodox", "unmitigated",
    "unleash", "unique", "uniform", "unfounded", "undermine", "underestimate", "uncanny", "zephyr", "zealot", "zeal", "yoke", "yawn", "xenophobe", "xenophile",
    "wrath", "wrought", "wrest", "wrench", "wretched", "wry", "writhe",
    "voracious", "vocation", "vitriolic", "vital", "virulence", "virile", "vindictive",
    "vindicate", "vigilance", "viable", "veritable", "verdant", "veneer", "vehement",
    "vector", "vanquish", "valor", "validate", "vacillate", "usurp", "uplift",
    "upheaval", "unyielding", "unwitting", "unveil", "unprecedented", "unorthodox", "unmitigated",
    "unleash", "unique", "uniform", "unfounded", "undermine", "underestimate", "uncanny",
    "uncertain", "unassailable", "unanimous", "ubiquitous", "tyrant", "turmoil", "turbulent",
    "tumultuous", "tumult", "trivial", "triumph", "trite", "trifle", "trespass",
    "transitory", "transient", "transcend", "tranquil", "tractable", "torturous", "torpid",
    "topple", "tome", "tirade", "timorous", "timid", "tiff", "tenuous",
    "temperamental", "tedious", "tedium", "tawdry", "taut", "tarry", "tangential",
    "tangible", "taciturn", "systematic", "sycophant", "swindle", "sway", "surreptitious",
    "surpass", "surly", "supplant", "superfluous", "summon", "sullen", "subtle",
    "subsidize", "subside", "subservient", "subordinate", "submissive", "sublime", "subjugate",
    "subdued", "stymie", "stupor", "stultify", "stunt", "strut", "strident",
    "strenuous", "stray", "stout", "stoic", "stifle", "stiffle", "stentorian",
    "stark", "static", "stalwart", "stagnate", "squalid", "spurn", "spurious",
    "squalor", "squat", "spry", "sprite", "sporadic", "spontaneous", "sponge",
    "uncertain", "unassailable", "unanimous", "ubiquitous", "tyrant", "turmoil", "turbulent",
    "tumultuous", "tumult", "trivial", "triumph", "trite", "trifle", "trespass",
    "transitory", "transient", "transcend", "tranquil", "tractable", "torturous", "torpid",
    "topple", "tome", "tirade", "timorous", "timid", "tiff", "tenuous",
    "temperamental", "tedious", "tedium", "tawdry", "taut", "tarry", "tangential",
    "tangible", "taciturn", "systematic", "sycophant", "swindle", "sway", "surreptitious",
    "surpass", "surly", "supplant", "superfluous", "summon", "sullen", "subtle",
    "subsidize", "subside", "subservient", "subordinate", "submissive", "sublime", "subjugate",
    "subdued", "stymie", "stupor", "stultify", "stunt", "strut", "strident",
    "strenuous", "stray", "stout", "stoic", "stifle", "stiffle", "stentorian",
    "stark", "static", "stalwart", "stagnate", "squalid", "spurn", "spurious",
    "squalor", "squat", "spry", "sprite", "sporadic", "spontaneous", "sponge",
    "spite", "spendthrift", "spectral", "soothe", "soothsayer", "sonorous", "sonnet",
    "solvent", "solitary", "solemn", "solicit", "sobriety", "snub", "sneer",
    "snare", "smug", "smolder", "slovenly", "slumber", "slight", "sleek",
    "skeptic", "sketchy", "skeptical", "skew", "skittish", "skimp", "siphon",
    "sinister", "simulate", "silt", "shun", "shoddy", "shimmer", "shirk",
    "sheer", "shackle", "shadowy", "shackle", "shabby", "sever", "sequester",
    "sentiment", "sensuous", "sensory", "sensible", "seminal", "seismic", "seethe",
].filter(word => word.length <= 10);

export function generateHardWord() {
    const length : number = hardWordsArray.length;
    const seed : number = Math.random() * 1000;
    const index : number = Math.floor(seed % length);
    return hardWordsArray[index];
}