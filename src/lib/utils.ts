export function fmt(n: number | undefined | null): string {
  if (n == null) return '—'
  return n.toLocaleString('en-US')
}

export function fmtRate(n: number | undefined | null, decimals = 1): string {
  if (n == null) return '—'
  return (n ?? 0).toFixed(decimals)
}

export function fmtPct(n: number | undefined | null): string {
  if (n == null) return '—'
  return (n ?? 0).toFixed(1) + '%'
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
}

export function stateName(abbr: string): string {
  const names: Record<string, string> = {
    AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',
    CT:'Connecticut',DE:'Delaware',DC:'District of Columbia',FL:'Florida',GA:'Georgia',
    HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',
    LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',
    MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',
    NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',
    OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',PR:'Puerto Rico',RI:'Rhode Island',
    SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',
    VA:'Virginia',VI:'Virgin Islands',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming',
  }
  return names[abbr] || abbr
}

export function crimeColor(type: string): string {
  const colors: Record<string, string> = {
    murder: '#991b1b',
    rape: '#9333ea',
    robbery: '#ea580c',
    'aggravated-assault': '#dc2626',
    burglary: '#2563eb',
    'larceny-theft': '#0891b2',
    'motor-vehicle-theft': '#4f46e5',
    arson: '#f59e0b',
    violent: '#dc2626',
    property: '#2563eb',
  }
  return colors[type] || '#6b7280'
}
