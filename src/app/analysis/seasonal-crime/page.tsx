import Breadcrumbs from '@/components/Breadcrumbs';
import AIOverview from '@/components/AIOverview';
import ShareButtons from '@/components/ShareButtons';
import RelatedAnalysis from '@/components/RelatedAnalysis';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seasonal Crime Patterns: When Does Crime Happen in America?',
  description:
    'Violent crime peaks in summer, property crime in fall. Homicides spike with temperature. Data-driven analysis of seasonal, monthly, and holiday crime patterns.',
  alternates: { canonical: 'https://www.opencrime.us/analysis/seasonal-crime' },
  openGraph: {
    title: 'Seasonal Crime Patterns: When Does Crime Happen in America?',
    description:
      'Violent crime peaks in summer, property crime in fall. Analysis of when crime happens based on FBI and BJS data.',
    url: 'https://www.opencrime.us/analysis/seasonal-crime',
  },
};

export default function SeasonalCrimePage() {
  const aiInsights = [
    'Violent crime peaks in July-August, with rates 15-20% higher than winter months',
    'Homicide has the strongest seasonal pattern — summer murders can be 30%+ above winter levels',
    'Property crime peaks in late summer and fall (August-October)',
    'Domestic violence spikes around major holidays, especially Thanksgiving and Christmas',
    'Retail theft surges in November-December during the holiday shopping season',
    'The temperature-crime link is one of the most robust findings in criminology',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Analysis', href: '/analysis' },
          { label: 'Seasonal Crime Patterns' },
        ]}
      />

      <div className="mb-6">
        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">
          ANALYSIS
        </span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        Seasonal Crime Patterns: When Does Crime Happen in America?
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Crime doesn&apos;t happen evenly throughout the year. Summer brings more violence, fall
        brings more theft, and holidays bring their own distinct patterns. These seasonal rhythms
        are among the most consistent findings in criminology — and understanding them is crucial
        for prevention, policing, and public safety planning.
      </p>

      <AIOverview insights={aiInsights} />

      {/* Key stats hero */}
      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">July–Aug</div>
            <div className="text-blue-200 text-sm">Peak Violent Crime</div>
          </div>
          <div>
            <div className="text-3xl font-bold">+15–20%</div>
            <div className="text-blue-200 text-sm">Summer vs Winter</div>
          </div>
          <div>
            <div className="text-3xl font-bold">Aug–Oct</div>
            <div className="text-blue-200 text-sm">Peak Property Crime</div>
          </div>
          <div>
            <div className="text-3xl font-bold">Feb</div>
            <div className="text-blue-200 text-sm">Lowest Crime Month</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">The Summer Surge: Why Violence Peaks in Warm Weather</h2>
        <p>
          The relationship between temperature and violent crime is one of the most well-documented
          findings in the social sciences. Across decades of research, in countries around the world,
          the pattern holds: as temperatures rise, so does violence. In the United States, violent
          crime rates in July and August are typically 15-20% higher than in January and February.
        </p>
        <p>
          Homicide shows the most dramatic seasonal variation. FBI data consistently shows that
          murders in peak summer months can exceed winter levels by 30% or more. Aggravated assault
          follows a similar pattern, though somewhat less pronounced. Even robbery, which has a more
          complex seasonal pattern, tends to peak in warmer months.
        </p>
        <p>
          For current violent crime statistics, see our{' '}
          <Link href="/violent-crime" className="text-[#1e3a5f] hover:underline">
            violent crime page
          </Link>{' '}
          and{' '}
          <Link href="/crime-rate" className="text-[#1e3a5f] hover:underline">
            overall crime rate data
          </Link>.
        </p>

        <h2 className="font-heading">Why Does Heat Increase Violence?</h2>
        <p>
          Criminologists have proposed several complementary theories for the temperature-violence
          connection:
        </p>

        <h3 className="font-heading">Routine Activities Theory</h3>
        <p>
          The most widely accepted explanation is rooted in routine activities theory, developed by
          Lawrence Cohen and Marcus Felson. Crime requires three elements converging in time and
          space: a motivated offender, a suitable target, and the absence of capable guardianship.
          Summer maximizes all three:
        </p>
        <ul>
          <li>
            <strong>More people are outside.</strong> Warm weather draws people out of homes and into
            public spaces — parks, sidewalks, bars with outdoor seating, street corners. This
            increases the density of potential offenders and victims in the same locations.
          </li>
          <li>
            <strong>More social interaction.</strong> People interact more in summer — barbecues,
            block parties, outdoor gatherings. More interaction means more opportunities for
            conflicts to arise, especially when alcohol is involved.
          </li>
          <li>
            <strong>Longer daylight hours.</strong> Extended evenings mean people are active later,
            extending the window during which crime can occur.
          </li>
          <li>
            <strong>School is out.</strong> Teenagers and young adults — the demographic most
            involved in both committing and being victimized by crime — have unstructured time
            during summer months.
          </li>
          <li>
            <strong>More vacant homes.</strong> Summer vacations leave homes empty, creating
            opportunities for burglary and theft.
          </li>
        </ul>

        <h3 className="font-heading">Heat Aggression Theory</h3>
        <p>
          Psychological research supports a direct link between heat and aggression. Studies show
          that high temperatures increase irritability, reduce impulse control, and lower the
          threshold for aggressive responses. Experiments in controlled settings consistently
          demonstrate that subjects exposed to heat are more likely to interpret ambiguous
          situations as hostile and respond aggressively.
        </p>
        <p>
          However, the relationship is not linear. Some researchers find a curvilinear pattern:
          violence increases with temperature up to about 85-90°F, then may level off or even
          decline at extreme temperatures (above 100°F) as people retreat indoors. This suggests
          that both physiological irritability and outdoor activity patterns contribute.
        </p>

        <h3 className="font-heading">Alcohol Consumption</h3>
        <p>
          Alcohol consumption increases significantly in summer months. Beer sales peak in July,
          outdoor festivals and events feature heavy drinking, and longer evenings mean more time
          at bars and parties. Since alcohol is a factor in roughly 40% of violent crimes, the
          summer drinking surge amplifies the temperature-violence connection.
        </p>
      </div>

      {/* Monthly pattern table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto my-6">
        <h3 className="font-semibold px-4 py-3 border-b">Typical Monthly Crime Variation (FBI/BJS Patterns)</h3>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Month</th>
              <th className="text-center px-4 py-2">Violent Crime</th>
              <th className="text-center px-4 py-2">Property Crime</th>
              <th className="text-center px-4 py-2">Homicide</th>
              <th className="text-left px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              { month: 'January', vc: '▼ Low', pc: '▼ Low', hom: '▼ Low', note: 'Post-holiday lull' },
              { month: 'February', vc: '▼▼ Lowest', pc: '▼▼ Lowest', hom: '▼▼ Lowest', note: 'Shortest month, coldest temps' },
              { month: 'March', vc: '— Average', pc: '— Average', hom: '— Rising', note: 'Spring transition' },
              { month: 'April', vc: '— Average', pc: '— Average', hom: '— Rising', note: 'Warming begins' },
              { month: 'May', vc: '▲ Rising', pc: '▲ Rising', hom: '▲ Rising', note: 'School ending, outdoor activity' },
              { month: 'June', vc: '▲ High', pc: '▲ High', hom: '▲▲ High', note: 'Summer begins' },
              { month: 'July', vc: '▲▲ Peak', pc: '▲ High', hom: '▲▲ Peak', note: 'Peak violence month' },
              { month: 'August', vc: '▲▲ Peak', pc: '▲▲ Peak', hom: '▲▲ Peak', note: 'Heat + activity peak' },
              { month: 'September', vc: '▲ High', pc: '▲▲ Peak', hom: '▲ High', note: 'Back to school, property peak' },
              { month: 'October', vc: '— Average', pc: '▲ High', hom: '— Declining', note: 'Property crime still elevated' },
              { month: 'November', vc: '▼ Low', pc: '— Average', hom: '▼ Declining', note: 'Holiday DV spike begins' },
              { month: 'December', vc: '▼ Low', pc: '▲ Elevated', hom: '▼ Low', note: 'Retail theft peak, holiday DV' },
            ].map((m) => (
              <tr key={m.month} className="border-t">
                <td className="px-4 py-2 font-medium">{m.month}</td>
                <td className="px-4 py-2 text-center">{m.vc}</td>
                <td className="px-4 py-2 text-center">{m.pc}</td>
                <td className="px-4 py-2 text-center">{m.hom}</td>
                <td className="px-4 py-2 text-gray-500 text-xs">{m.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-heading">Property Crime: A Different Seasonal Rhythm</h2>
        <p>
          Property crime follows a somewhat different seasonal pattern than violent crime. While
          violent crime peaks sharply in July-August, property crime has a broader peak extending
          from late summer through fall.
        </p>
        <p>
          For current property crime data, see our{' '}
          <Link href="/property-crime" className="text-[#1e3a5f] hover:underline">
            property crime page
          </Link>.
        </p>

        <h3 className="font-heading">Burglary</h3>
        <p>
          Residential burglary peaks in summer months when homes are more likely to be empty due to
          vacations. Daytime burglary — which accounts for about 60% of residential break-ins — is
          facilitated by longer daylight hours and open windows. Burglary then rises again slightly
          in December when homes display visible gifts and residents are away visiting family.
        </p>

        <h3 className="font-heading">Motor Vehicle Theft</h3>
        <p>
          Auto theft shows a summer peak as well, driven by increased outdoor activity, cars left
          in parking lots at events, and warmer weather enabling more comfortable theft operations.
          The pattern is less pronounced than for violent crime but still measurable.
        </p>

        <h3 className="font-heading">Retail Theft and Shoplifting</h3>
        <p>
          Retail theft is an exception to the summer-peak pattern. Shoplifting and organized retail
          crime surge in November and December during the holiday shopping season. The combination
          of crowded stores, high-value merchandise displays, and economic pressure creates prime
          conditions for theft. The National Retail Federation estimates that shrink costs spike
          significantly during the holiday quarter.
        </p>

        <h2 className="font-heading">Holiday Crime Patterns</h2>
        <p>
          Specific holidays create their own distinct crime patterns:
        </p>

        <h3 className="font-heading">New Year&apos;s Eve/Day</h3>
        <p>
          New Year&apos;s is associated with a sharp spike in DUI/DWI incidents, alcohol-fueled
          assaults, and celebratory gunfire (in some regions). Law enforcement typically deploys
          additional resources for the holiday. New Year&apos;s Day often sees elevated domestic
          violence calls as families deal with the aftermath of heavy drinking.
        </p>

        <h3 className="font-heading">Super Bowl Sunday</h3>
        <p>
          Contrary to the long-standing myth that domestic violence surges 40% on Super Bowl Sunday,
          research has produced mixed results. Some studies find a modest increase in DV calls (10-15%),
          while others find no significant change. What is clear is that alcohol-related incidents
          increase on Super Bowl Sunday, as with any major drinking occasion.
        </p>

        <h3 className="font-heading">Memorial Day through Labor Day</h3>
        <p>
          The &quot;summer violence season&quot; is bookended by these holidays. Memorial Day weekend
          typically marks the beginning of the annual surge in violent crime, while Labor Day weekend
          often sees some of the highest violence levels of the year. In cities like Chicago, holiday
          weekends with warm weather can produce horrific shooting tallies — Chicago has recorded 70+
          shooting victims on single holiday weekends.
        </p>

        <h3 className="font-heading">Fourth of July</h3>
        <p>
          The Fourth of July consistently ranks as one of the most violent days of the year. The
          combination of maximum summer heat, all-day outdoor gatherings, heavy alcohol consumption,
          and the availability of fireworks (which can mask gunshots and complicate evidence
          collection) creates a perfect storm. Many cities see their single most violent 24-hour
          period on or around July 4th.
        </p>

        <h3 className="font-heading">Halloween</h3>
        <p>
          Halloween sees spikes in vandalism, property damage, and minor mischief — particularly
          on the night of October 30 (&quot;Mischief Night&quot; or &quot;Devil&apos;s Night&quot;
          in some regions). Detroit&apos;s notorious Devil&apos;s Night arsons peaked in the 1980s
          with hundreds of fires. Costume-wearing and anonymity also contribute to opportunistic
          crime. Sex offender compliance checks are a major law enforcement focus.
        </p>

        <h3 className="font-heading">Thanksgiving and Christmas</h3>
        <p>
          The winter holidays bring a well-documented spike in{' '}
          <Link href="/analysis/domestic-violence" className="text-[#1e3a5f] hover:underline">
            domestic violence
          </Link>.
          The combination of family stress, financial pressure, alcohol consumption, and forced
          proximity creates conditions for interpersonal violence. Research consistently shows DV
          calls increase 20-30% around Thanksgiving and Christmas compared to baseline periods.
        </p>
        <p>
          Paradoxically, overall violent crime tends to decrease on Christmas Day itself — one of
          the lowest-violence days of the year for stranger crime. People are indoors with family,
          streets are empty, and most businesses are closed. The violence that does occur is
          overwhelmingly domestic.
        </p>

        <h2 className="font-heading">Day of Week and Time of Day</h2>
        <p>
          Crime also follows strong weekly and daily patterns:
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto my-6">
        <h3 className="font-semibold px-4 py-3 border-b">Crime by Day of Week (General Patterns)</h3>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Day</th>
              <th className="text-center px-4 py-2">Violent Crime</th>
              <th className="text-center px-4 py-2">Property Crime</th>
              <th className="text-left px-4 py-2">Key Pattern</th>
            </tr>
          </thead>
          <tbody>
            {[
              { day: 'Monday', vc: 'Below avg', pc: 'Average', note: 'Start-of-week lull' },
              { day: 'Tuesday', vc: 'Below avg', pc: 'Average', note: 'Lowest weekday violence' },
              { day: 'Wednesday', vc: 'Average', pc: 'Average', note: 'Mid-week baseline' },
              { day: 'Thursday', vc: 'Average', pc: 'Average', note: 'Slight uptick begins' },
              { day: 'Friday', vc: 'Above avg', pc: 'Above avg', note: 'Weekend begins, bar activity' },
              { day: 'Saturday', vc: 'Peak', pc: 'Above avg', note: 'Highest violence day' },
              { day: 'Sunday', vc: 'Above avg', pc: 'Below avg', note: 'Early hours violent, daytime quiet' },
            ].map((d) => (
              <tr key={d.day} className="border-t">
                <td className="px-4 py-2 font-medium">{d.day}</td>
                <td className="px-4 py-2 text-center">{d.vc}</td>
                <td className="px-4 py-2 text-center">{d.pc}</td>
                <td className="px-4 py-2 text-gray-500 text-xs">{d.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none">
        <p>
          Saturday night through Sunday morning is consistently the most violent period of the week.
          Friday and Saturday nights — when bar activity peaks, alcohol consumption is highest, and
          people are socially active — account for a disproportionate share of assaults, homicides,
          and DUI incidents. The{' '}
          <Link href="/crime-clock" className="text-[#1e3a5f] hover:underline">
            crime clock
          </Link>{' '}
          visualizes the tempo of crime in real time.
        </p>

        <h3 className="font-heading">Time of Day</h3>
        <p>
          Violent crime peaks between 8 PM and 2 AM, with the highest concentration around midnight.
          This aligns with nightlife activity, bar closing times, and the intersection of alcohol,
          darkness, and reduced guardianship. Homicides are particularly concentrated in late evening
          and early morning hours.
        </p>
        <p>
          Property crime follows a different pattern. Residential burglary peaks during weekday
          daytime hours (10 AM to 3 PM) when homes are most likely to be unoccupied. Commercial
          burglary, conversely, peaks in overnight hours. Robbery straddles both patterns, with
          daytime occurrences on commercial streets and nighttime occurrences in isolated areas.
        </p>

        <h2 className="font-heading">Climate Change and Future Crime Patterns</h2>
        <p>
          The temperature-crime relationship has significant implications in the context of climate
          change. If warmer temperatures drive more violent crime, a warming planet could mean
          permanently elevated crime levels.
        </p>
        <p>
          Research estimates vary, but several studies project measurable increases:
        </p>
        <ul>
          <li>
            A 2020 study in the <em>Journal of Environmental Economics and Management</em> estimated
            that a 2°C increase in average temperatures could increase violent crime by 1-3%
            nationally.
          </li>
          <li>
            More dramatic projections suggest that under high-warming scenarios, US violent crime
            could increase by 5% or more by 2100 due to temperature effects alone.
          </li>
          <li>
            Heat waves — which are becoming more frequent and intense — are associated with acute
            spikes in violence that exceed normal seasonal patterns.
          </li>
          <li>
            Extreme weather events (hurricanes, floods) also create crime opportunities through
            displacement, resource scarcity, and disrupted social control.
          </li>
        </ul>
        <p>
          Cities in the Sun Belt — already experiencing rapid population growth — may face
          compounding challenges as longer, hotter summers extend the traditional violence season.
          Adaptation strategies, from cooling centers to adjusted policing schedules, will become
          increasingly important.
        </p>

        <h2 className="font-heading">Implications for Prevention and Policing</h2>
        <p>
          Understanding seasonal crime patterns has practical applications:
        </p>
        <ul>
          <li>
            <strong>Resource allocation.</strong> Police departments should deploy additional patrol
            and detective resources during summer months, particularly on weekend nights. Many
            already do this with &quot;summer surge&quot; programs.
          </li>
          <li>
            <strong>Summer youth programs.</strong> Programs that provide structured activities for
            young people during summer months — employment, recreation, mentoring — can reduce the
            unstructured time that contributes to summer crime spikes.
          </li>
          <li>
            <strong>Holiday-specific interventions.</strong> DV hotlines and shelters should prepare
            for increased demand around Thanksgiving and Christmas. DUI enforcement should intensify
            around New Year&apos;s and Fourth of July.
          </li>
          <li>
            <strong>Environmental design.</strong> Public spaces can be designed to mitigate
            temperature-related aggression: shade structures, cooling stations, and water features
            in high-crime areas.
          </li>
          <li>
            <strong>Violence intervention timing.</strong> Community-based violence intervention
            programs should intensify outreach as temperatures rise, focusing on the specific
            weekend nights and summer holiday periods when shootings spike.
          </li>
        </ul>

        <h2 className="font-heading">The Bottom Line</h2>
        <p>
          Crime has a calendar. Violence peaks in summer, property crime extends into fall, and
          holidays create their own distinctive patterns. These rhythms are driven by the
          interaction of temperature, human activity patterns, alcohol consumption, and social
          dynamics.
        </p>
        <p>
          Understanding when crime happens is essential for preventing it. Every police chief,
          community organization, and policymaker should plan for the predictable surge in summer
          violence and the equally predictable holiday patterns. The data is clear — now we need
          to act on it.
        </p>

        <h2 className="font-heading">Frequently Asked Questions</h2>
        <h3>What month has the most crime?</h3>
        <p>
          July and August consistently have the highest rates of violent crime, including homicide
          and aggravated assault. For property crime, the peak extends into September and October.
          February is typically the lowest-crime month.
        </p>
        <h3>Why does crime increase in summer?</h3>
        <p>
          Multiple factors converge: more people are outdoors and interacting, heat increases
          aggression, school is out (more unsupervised youth), alcohol consumption rises, and
          longer daylight hours extend the window for criminal activity.
        </p>
        <h3>Does domestic violence really spike on holidays?</h3>
        <p>
          Yes. Research consistently shows DV calls increase 20-30% around Thanksgiving and
          Christmas due to family stress, financial pressure, alcohol, and forced proximity. The
          Super Bowl spike is largely a myth, though alcohol-related incidents do increase.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link
          href="/crime-rate"
          className="bg-[#1e3a5f] text-white px-5 py-2 rounded-lg hover:bg-[#2a4d7a] transition"
        >
          2024 Crime Rate
        </Link>
        <Link
          href="/violent-crime"
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Violent Crime Data
        </Link>
        <Link
          href="/property-crime"
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Property Crime Data
        </Link>
        <Link
          href="/crime-clock"
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Crime Clock
        </Link>
      </div>

      <div className="mt-8">
        <RelatedAnalysis currentSlug="seasonal-crime" />
        <ShareButtons title="Seasonal Crime Patterns: When Does Crime Happen in America?" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Seasonal Crime Patterns: When Does Crime Happen in America?',
            description:
              'Violent crime peaks in summer, property crime in fall. Data-driven analysis of seasonal crime patterns.',
            publisher: {
              '@type': 'Organization',
              name: 'OpenCrime',
              url: 'https://www.opencrime.us',
            },
            datePublished: '2026-03-05',
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What month has the most crime?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'July and August have the highest violent crime rates. Property crime peaks in August-October. February is typically the lowest-crime month.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why does crime increase in summer?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'More outdoor activity, heat-related aggression, school being out, increased alcohol consumption, and longer daylight hours all contribute.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does domestic violence really spike on holidays?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. DV calls increase 20-30% around Thanksgiving and Christmas due to family stress, financial pressure, and alcohol consumption.',
                },
              },
            ],
          }),
        }}
      />

      <p className="text-sm text-gray-500 mt-8">
        Sources: FBI Crime Data Explorer, Bureau of Justice Statistics, published criminological
        research on seasonal crime patterns.
      </p>
    </div>
  );
}
