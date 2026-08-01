import {
  BarChart,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  LineChart,
  Link,
  PieChart,
  Pill,
  Row,
  Stack,
  Stat,
  Swatch,
  Table,
  Text,
  useHostTheme,
} from "cursor/canvas";

/** Steady-state colony at Jade (lounge ~1,000–1,100 SF of 1,666 SF). */
const COLONY_TARGET = 12;
const COLONY_FLOOR_MIN = 10;
const COLONY_FLOOR_MAX = 12;
const QUARANTINE_SLOTS = 2;

/** Monthly café-paid cat care for 12-cat colony (rescue covers intake vaccines/S-N). */
const CAT_CARE_MONTHLY = [
  { label: "Food (wet + dry)", value: 504 },
  { label: "Litter & liners", value: 264 },
  { label: "Routine vet reserve", value: 360 },
  { label: "Emergency vet reserve", value: 600 },
  { label: "Parasite prevention", value: 180 },
  { label: "Enrichment / replaceables", value: 90 },
  { label: "Sanitation / laundry", value: 140 },
];

const REVENUE_MIX = [
  { label: "Lounge admission", value: 52 },
  { label: "Food & beverage", value: 34 },
  { label: "Events & memberships", value: 10 },
  { label: "Merch & adoptions", value: 4 },
];

const YEAR_ONE_REVENUE = [
  { label: "M1", value: 18 },
  { label: "M2", value: 24 },
  { label: "M3", value: 29 },
  { label: "M4", value: 33 },
  { label: "M5", value: 36 },
  { label: "M6", value: 38 },
  { label: "M7", value: 40 },
  { label: "M8", value: 41 },
  { label: "M9", value: 42 },
  { label: "M10", value: 43 },
  { label: "M11", value: 44 },
  { label: "M12", value: 45 },
];

function PinkTag({ children }: { children: string }) {
  const theme = useHostTheme();
  return (
    <Text
      style={{
        fontSize: 12,
        fontWeight: 590,
        color: theme.category.pink,
        border: `1px solid ${theme.category.pink}`,
        borderRadius: 4,
        padding: "3px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Text>
  );
}

function PinkBar() {
  const theme = useHostTheme();
  return (
    <div
      style={{
        height: 3,
        width: 48,
        background: theme.category.pink,
        borderRadius: 2,
      }}
    />
  );
}

function FloorPlanSchematic() {
  const theme = useHostTheme();
  const pink = theme.category.pink;
  const stroke = theme.stroke.secondary;
  const muted = theme.text.tertiary;

  return (
    <svg
      viewBox="0 0 520 300"
      width="100%"
      style={{ display: "block", borderRadius: 8, background: theme.fill.tertiary }}
    >
      <text x="16" y="24" fill={pink} fontSize="13" fontWeight="650">
        Jade Suite 2 · concept floor plan (DBPR split)
      </text>
      <text x="16" y="42" fill={muted} fontSize="11">
        1,666 SF interior + 895 SF patio · Willow &amp; Cass
      </text>

      {/* Patio */}
      <rect x="24" y="64" width="120" height="100" fill="#3d6b4f33" stroke="#5a8f6e" strokeWidth="2" rx="4" />
      <text x="44" y="118" fill={theme.text.secondary} fontSize="12" fontWeight="600">
        Human patio
      </text>
      <text x="52" y="136" fill={muted} fontSize="10">
        895 SF · no cats
      </text>

      {/* Cafe */}
      <rect x="24" y="176" width="120" height="96" fill={`${pink}44`} stroke={pink} strokeWidth="2" rx="4" />
      <text x="48" y="220" fill={theme.text.primary} fontSize="12" fontWeight="600">
        Café bar
      </text>
      <text x="40" y="238" fill={muted} fontSize="10">
        Espresso · POS
      </text>
      <text x="36" y="254" fill={muted} fontSize="10">
        Cats never enter
      </text>

      {/* Glass wall */}
      <line x1="156" y1="176" x2="156" y2="272" stroke={pink} strokeWidth="3" strokeDasharray="6 4" />
      <text x="148" y="168" fill={pink} fontSize="9" fontWeight="600">
        glass
      </text>

      {/* Lounge */}
      <rect x="168" y="64" width="230" height="208" fill={`${pink}22`} stroke={pink} strokeWidth="2" rx="4" />
      <text x="230" y="150" fill={theme.text.primary} fontSize="14" fontWeight="650">
        Cat lounge
      </text>
      <text x="218" y="170" fill={muted} fontSize="11">
        Sessions · adoption floor
      </text>
      <circle cx="220" cy="210" r="10" fill={pink} opacity="0.5" />
      <circle cx="260" cy="230" r="10" fill={pink} opacity="0.45" />
      <circle cx="300" cy="200" r="10" fill={pink} opacity="0.55" />
      <circle cx="340" cy="225" r="10" fill={pink} opacity="0.4" />

      {/* BOH */}
      <rect x="410" y="64" width="90" height="100" fill={theme.fill.secondary} stroke={stroke} strokeWidth="2" rx="4" />
      <text x="428" y="112" fill={theme.text.secondary} fontSize="11" fontWeight="600">
        BOH
      </text>
      <text x="418" y="130" fill={muted} fontSize="9">
        Quarantine
      </text>

      {/* Apts note */}
      <rect x="410" y="180" width="90" height="92" fill={theme.fill.quaternary} stroke={stroke} strokeWidth="1" rx="4" />
      <text x="424" y="222" fill={muted} fontSize="10" fontWeight="600">
        192 apts
      </text>
      <text x="430" y="240" fill={muted} fontSize="9">
        above
      </text>

      <text x="16" y="292" fill={muted} fontSize="10">
        Concept schematic for investor pitch · not construction drawings
      </text>
    </svg>
  );
}

export default function TampaCatCafeInvestorPitch() {
  const theme = useHostTheme();
  const pink = theme.category.pink;

  return (
    <Stack gap={28} style={{ padding: 24, maxWidth: 980 }}>
      <Stack gap={8}>
        <Row gap={8} align="center" wrap>
          <PinkTag>Investor Pitch · Confidential</PinkTag>
          <PinkTag>Favorite site: Jade</PinkTag>
          <PinkTag>Wed · Girlz and Gears</PinkTag>
          <Pill tone="neutral">Tampa, FL · 2026</Pill>
          <Pill tone="success">Independent · Rescue-partnered</Pill>
        </Row>
        <PinkBar />
        <H1 style={{ color: pink }}>Whisker Watch Café</H1>
        <Text tone="secondary" style={{ fontSize: 15, lineHeight: 1.5, maxWidth: 760 }}>
          Founder-favorite location: Jade at North Hyde Park — ground-floor
          restaurant/retail under 192 apartments at Willow &amp; Cass, with outdoor
          patio, dedicated retail parking, and a clear DBPR-compliant dual-zone plan.
          Community hook: Wednesday night Girls Bike Nights with Girlz and Gears.
        </Text>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="$280K" label="Seed raise" />
        <Stat value="10–12" label="Cats on lounge floor" tone="success" />
        <Stat value="~$2.1K" label="Cat care / month" />
        <Stat value="1,666 SF" label="Jade Suite 2 interior" />
      </Grid>

      <Callout tone="success" title="Selected site — Jade at North Hyde Park">
        608 N Willow Ave, Tampa FL 33606. Mixed-use ground floor (restaurant-ready)
        + patio under apartments. Walkable to University of Tampa, Riverwalk, and
        downtown. Interactive 3D concept model included with this pitch. Weekly
        community driver: Girlz and Gears Wednesday Girls Bike Night on the patio.
      </Callout>

      <Divider />

      <Stack gap={12}>
        <Row gap={8} align="center">
          <Swatch color="pink" />
          <H2>Partnership — Girlz and Gears · Wednesday Bike Nights</H2>
        </Row>
        <Callout tone="info" title="Weekly midweek demand engine">
          Whisker Watch partners with Girlz and Gears for Girls Bike Night every
          Wednesday — ride community + café patio hang + optional lounge add-on.
          Builds a loyal women/girls audience, fills a slow weeknight, and keeps
          bikes on the patio (never in the cat lounge).
        </Callout>
        <Grid columns={2} gap={12}>
          <Table
            headers={["Element", "Plan"]}
            rows={[
              ["Cadence", "Every Wednesday evening"],
              ["Host brands", "Whisker Watch Café × Girlz and Gears"],
              ["Format", "Group ride meet → patio hang → optional lounge"],
              ["Primary space", "895 SF human patio + café bar"],
              ["Bikes", "Rack / patio / street only — never in lounge"],
              ["Lounge add-on", "Optional reserved block (age 8+ policy)"],
              ["Audience", "Girls & women riders · beginners welcome"],
              ["Revenue", "Group patio tabs, session packs, merch, collab nights"],
            ]}
            striped
          />
          <Stack gap={10}>
            <H3>Why this helps investors</H3>
            <Text>• Fixes Wednesday softness with recurring community traffic</Text>
            <Text>• Cross-promotes two founder-aligned brands</Text>
            <Text>• Patio-first = health-code safe with cats indoors</Text>
            <Text>• Content flywheel (rides + cats = social reach)</Text>
            <Text>• Pipeline into memberships & private events</Text>
            <Callout tone="warning" title="Ops guardrails">
              Helmets recommended for rides. No bikes indoors. Litters sealed during
              patio peaks. Apartment quiet-hours respected for evening volume.
            </Callout>
          </Stack>
        </Grid>
      </Stack>

      <Divider />

      <Stack gap={12}>
        <Row gap={8} align="center">
          <Swatch color="pink" />
          <H2>Favorite building: Jade</H2>
        </Row>

        <Card>
          <CardHeader trailing={<PinkTag>Founder pick</PinkTag>}>
            608 N Willow Ave · North Hyde Park
          </CardHeader>
          <CardBody>
            <Stack gap={14}>
              <FloorPlanSchematic />

              <Row gap={12} wrap>
                <Link href="http://localhost:8765/jade-whiskerwatch-3d.html">
                  Open interactive 3D model
                </Link>
                <Link href="https://www.acrefl.com/jade-at-north-hyde-park">
                  ACRE listing page
                </Link>
                <Link href="https://www.google.com/maps/place/608+N+Willow+Ave,+Tampa,+FL+33606">
                  Google Maps
                </Link>
              </Row>

              <Grid columns={2} gap={12}>
                <Table
                  headers={["Spec", "Detail"]}
                  rows={[
                    ["Building", "Jade at North Hyde Park (2022)"],
                    ["Suite", "Ground-floor Suite 2 (available)"],
                    ["Interior", "1,666 SF restaurant / retail"],
                    ["Patio", "895 SF outdoor · zoned seating"],
                    ["Above", "192 luxury apartments"],
                    ["Parking", "42 dedicated retail garage stalls"],
                    ["Trade area", "UT · TGH · downtown · Riverwalk"],
                    ["1-mi avg HH income", "$122,453 (broker demo)"],
                    ["Asking rent", "Not published — quote required"],
                  ]}
                  striped
                />
                <Stack gap={10}>
                  <H3>Why this is the favorite</H3>
                  <Text>• Corner activation + outdoor patio</Text>
                  <Text>• Captive residents upstairs + student daytime</Text>
                  <Text>• Restaurant product type (easier TI path)</Text>
                  <Text>• Near UT / downtown experiential demand</Text>
                  <Text>• Brand-forward street presence for social content</Text>
                  <Callout tone="warning" title="Rent reality check">
                    Expect South Tampa / urban mixed-use pricing above The Hite’s
                    $27/SF. Model all-in occupancy after NNN/CAM once ACRE quotes.
                  </Callout>
                </Stack>
              </Grid>

              <Stack gap={6}>
                <H3>Leasing contacts (ACRE Commercial)</H3>
                <Text>Sandi Bargfrede · Managing Partner · 407-491-8149 · sandi@acrefl.com</Text>
                <Text>Jamie Eads · Leasing Manager · 407-690-0796 · jamie@acrefl.com</Text>
              </Stack>
            </Stack>
          </CardBody>
        </Card>
      </Stack>

      <Divider />

      <Stack gap={12}>
        <Row gap={8} align="center">
          <Swatch color="pink" />
          <H2>Health-code plan (Florida / DBPR)</H2>
        </Row>
        <Callout tone="info" title="Yes — Jade can work if split correctly">
          Florida Food Code does not allow cats in food prep. Whisker Watch uses the
          proven Tampa dual-zone model: sealed lounge + separate café bar; patio =
          humans only. Packaged snacks and guest drinks for consumption are allowed
          in the cat lounge — prep stays on the café side of the glass.
        </Callout>
        <Callout tone="success" title="Packaged snacks in the lounge">
          Florida operators (e.g. Frisky Cat Café, Orlando Cat Café) confirm the
          bright line is prep vs. guest consumption: cats never enter food prep, but
          café-purchased packaged snacks and drinks may be taken into the lounge.
          Jade plan: sell sealed bites at the bar → guests carry them into reserved
          sessions. Confirm final wording with Hillsborough County / local health
          during DBPR plan review.
        </Callout>
        <Table
          headers={["Zone", "Rule", "Jade application"]}
          rows={[
            ["Café bar", "No animals · all prep here", "Street-front espresso / POS — cats never enter"],
            [
              "Cat lounge",
              "Separate room · guest consumption OK",
              "Packaged snacks + drinks allowed; no open food prep behind glass",
            ],
            ["Menu / bakery", "Packaged or off-site", "Sealed bites sold at bar; plated only on café side"],
            ["BOH", "Quarantine / litter", "Back suite for medical hold + laundry"],
            ["Patio", "Not for free-roam cats", "Human overflow seating only"],
            ["Approvals", "Required", "Landlord animal consent + DBPR / local health plan review"],
          ]}
          striped
        />
      </Stack>

      <Divider />

      <Stack gap={12}>
        <Row gap={8} align="center">
          <Swatch color="pink" />
          <H2>Colony size &amp; cat-care costs</H2>
        </Row>

        <Callout tone="success" title={`Target: ${COLONY_FLOOR_MIN}–${COLONY_FLOOR_MAX} cats on the floor (+${QUARANTINE_SLOTS} quarantine)`}>
          Jade’s lounge is roughly 1,000–1,100 SF after carving café bar + BOH from
          1,666 SF. Industry baseline is ~100 SF lounge per cat and typical cafés
          run 8–15 cats (Cats &amp; Caffeine Tampa keeps ~10–15). Whisker Watch
          targets {COLONY_TARGET} adoptable cats on the floor for welfare + guest
          experience, with {QUARANTINE_SLOTS} isolation slots so intake never
          mixes with the public colony.
        </Callout>

        <Grid columns={2} gap={12}>
          <Stack gap={10}>
            <H3>Why {COLONY_TARGET} (not more)</H3>
            <Table
              headers={["Rule of thumb", "Jade application"]}
              rows={[
                ["~100 SF lounge / cat", "1,000–1,100 SF lounge → 10–11 cats"],
                ["Industry norm", "Most U.S. cafés: 8–15 cats"],
                ["Guest : cat ratio", "12–15 guests / session → ~1 cat per guest"],
                ["Temperament mix", "Social + moderate + quiet retreat cats"],
                ["Vertical space", "Trees / shelves raise effective capacity safely"],
                [
                  "Hard cap on-site",
                  `${COLONY_FLOOR_MAX} floor + ${QUARANTINE_SLOTS} quarantine = ${COLONY_FLOOR_MAX + QUARANTINE_SLOTS}`,
                ],
              ]}
              striped
            />
            <Text tone="tertiary" style={{ fontSize: 12 }}>
              Sources: Homebase cat-café guide (8–15 cats; ~100 SF/cat); Tampa peer
              Cats &amp; Caffeine (~10–15); welfare practice favors quality over
              crowding under apartments.
            </Text>
          </Stack>
          <Stack gap={10}>
            <H3>Operating model</H3>
            <Card>
              <CardBody>
                <Stack gap={6}>
                  <Text>
                    <Text weight="semibold">Rescue partnership</Text> holds legal
                    ownership; café is foster/display site.
                  </Text>
                  <Text>
                    Partner typically covers intake vaccines, spay/neuter,
                    microchip, and adoption screening.
                  </Text>
                  <Text>
                    Café pays daily food, litter, enrichment, on-site illness, and
                    a funded emergency reserve.
                  </Text>
                  <Text>
                    Rotation: as cats adopt out, quarantine → floor so the lounge
                    stays near {COLONY_TARGET}.
                  </Text>
                </Stack>
              </CardBody>
            </Card>
            <Grid columns={2} gap={8}>
              <Stat value={`${COLONY_FLOOR_MIN}–${COLONY_FLOOR_MAX}`} label="Floor colony" />
              <Stat value={`${QUARANTINE_SLOTS}`} label="Quarantine slots" />
              <Stat value="12–15" label="Max guests / session" />
              <Stat value="8+" label="Age policy (lounge)" />
            </Grid>
          </Stack>
        </Grid>

        <H3>Monthly cat-care budget — {COLONY_TARGET}-cat colony</H3>
        <BarChart
          categories={CAT_CARE_MONTHLY.map((d) => d.label)}
          series={[
            {
              name: "Monthly $ (café-paid)",
              data: CAT_CARE_MONTHLY.map((d) => d.value),
            },
          ]}
          valuePrefix="$"
          height={240}
        />
        <Text tone="tertiary" style={{ fontSize: 12 }}>
          Modeled café-paid spend for {COLONY_TARGET} cats · Tampa mid-tier quality
          food/litter · routine vet amortized + emergency reserve funded monthly.
          Rescue partner medical coverage reduces intake spikes.
        </Text>

        <Table
          headers={["Line item", "Per cat / mo", `× ${COLONY_TARGET}`, "Annual", "Notes"]}
          columnAlign={["left", "right", "right", "right", "left"]}
          rows={[
            ["Food (wet + dry premium mix)", "$42", "$504", "$6,048", "Quality diet; fewer GI issues"],
            ["Litter, liners, disposal bags", "$22", "$264", "$3,168", "~1 box per 1–2 cats"],
            ["Routine vet reserve", "$30", "$360", "$4,320", "Wellness / fecal / booster share"],
            ["Emergency vet reserve", "$50", "$600", "$7,200", "Fund — not spent every month"],
            ["Flea / parasite prevention", "$15", "$180", "$2,160", "Year-round Florida climate"],
            ["Toys, scratchers, replaceables", "—", "$90", "$1,080", "Colony total"],
            ["Sanitation / laundry / odor", "—", "$140", "$1,680", "Enzymatic cleaner, wash"],
            [
              "Total café-paid (ex-payroll)",
              "—",
              "~$2,138",
              "~$25.7K",
              "Inside working-capital plan",
            ],
          ]}
          striped
        />

        <Grid columns={3} gap={12}>
          <Card>
            <CardHeader>Steady monthly</CardHeader>
            <CardBody>
              <Text weight="semibold" style={{ fontSize: 22, color: pink }}>
                ~$2,100–2,400
              </Text>
              <Text tone="secondary">Food + litter + reserves + supplies</Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Annual cat care</CardHeader>
            <CardBody>
              <Text weight="semibold" style={{ fontSize: 22, color: pink }}>
                ~$26–29K
              </Text>
              <Text tone="secondary">Before staff time / insurance</Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Startup cat setup</CardHeader>
            <CardBody>
              <Text weight="semibold" style={{ fontSize: 22, color: pink }}>
                $6–9K
              </Text>
              <Text tone="secondary">Trees, boxes, bowls, first inventory</Text>
            </CardBody>
          </Card>
        </Grid>

        <Callout tone="warning" title="What the rescue usually pays (keep it in the MOU)">
          Spay/neuter, core vaccines, FeLV/FIV tests, microchips, and adoption
          paperwork should sit with the nonprofit partner. Whisker Watch’s P&amp;L
          should not absorb full shelter medical — only on-site living costs and a
          clear emergency clause while cats are in the café.
        </Callout>
      </Stack>

      <Divider />

      <Stack gap={12}>
        <Row gap={8} align="center">
          <Swatch color="pink" />
          <H2>Unit economics (base case)</H2>
        </Row>
        <Grid columns={2} gap={16}>
          <Stack gap={10}>
            <H3>Y2 revenue mix</H3>
            <PieChart data={REVENUE_MIX} donut size={200} />
          </Stack>
          <Stack gap={10}>
            <H3>Year 1 monthly revenue ramp ($K)</H3>
            <LineChart
              categories={YEAR_ONE_REVENUE.map((d) => d.label)}
              series={[
                {
                  name: "Revenue ($K)",
                  data: YEAR_ONE_REVENUE.map((d) => d.value),
                },
              ]}
              height={200}
            />
          </Stack>
        </Grid>
        <Grid columns={3} gap={12}>
          <Card>
            <CardHeader>Y1 revenue</CardHeader>
            <CardBody>
              <Text weight="semibold" style={{ fontSize: 22, color: pink }}>
                ~$433K
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Y2 revenue</CardHeader>
            <CardBody>
              <Text weight="semibold" style={{ fontSize: 22, color: pink }}>
                ~$532K
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Y2 EBITDA</CardHeader>
            <CardBody>
              <Text weight="semibold" style={{ fontSize: 22, color: pink }}>
                ~$85K
              </Text>
              <Text tone="secondary">Re-check after Jade rent quote</Text>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Divider />

      <Stack gap={12}>
        <Row gap={8} align="center">
          <Swatch color="pink" />
          <H2>Use of funds — $280K</H2>
        </Row>
        <Table
          headers={["Bucket", "Amount", "%"]}
          columnAlign={["left", "right", "right"]}
          rows={[
            ["Finish-out + glass / HVAC animal-food split", "$90K", "32%"],
            ["Working capital (4 months, incl. cat care)", "$78K", "28%"],
            ["Café equipment & POS", "$38K", "14%"],
            ["Deposits & pre-opening rent", "$25K", "9%"],
            ["Cat setup (trees, boxes, bowls, first food/litter)", "$8K", "3%"],
            ["Lounge enrichment & soft goods", "$10K", "4%"],
            ["Launch marketing", "$12K", "4%"],
            ["Licenses / legal / insurance", "$8K", "3%"],
            ["F&B opening inventory", "$5K", "2%"],
            ["Emergency vet seed fund", "$6K", "2%"],
          ]}
          striped
        />
        <Text tone="tertiary" style={{ fontSize: 12 }}>
          Working capital assumes ~$2.2K/mo cat care × 4 months inside the $78K
          runway, plus payroll/rent/COGS. Emergency vet seed is separate from the
          monthly $600 reserve once open.
        </Text>
      </Stack>

      <Stack gap={12}>
        <Row gap={8} align="center">
          <Swatch color="pink" />
          <H2>Risks unique to Jade</H2>
        </Row>
        <Table
          headers={["Risk", "Severity", "Mitigation"]}
          rowTone={["danger", "warning", "warning", "info"]}
          rows={[
            [
              "Landlord rejects live-animal lounge under apartments",
              "High",
              "Written consent before LOI; odor/HVAC plan in package",
            ],
            [
              "Published rent higher than Seminole Heights comps",
              "Med–High",
              "Get ACRE quote; stress-test at $40–45/SF + NNN",
            ],
            [
              "1,666 SF tighter than 2,000+ ideal",
              "Medium",
              "Lean menu; use patio for human overflow; capacity caps",
            ],
            [
              "Closer to Cats & Caffeine trade area",
              "Medium",
              "Different guest mix (UT / downtown); premium brand positioning",
            ],
          ]}
          striped
        />
      </Stack>

      <Divider />

      <Stack gap={10}>
        <Row gap={8} align="center">
          <Swatch color="pink" />
          <H2>The ask</H2>
        </Row>
        <Card>
          <CardBody>
            <Stack gap={12}>
              <Text style={{ fontSize: 15, lineHeight: 1.55 }}>
                Raise{" "}
                <Text weight="semibold" style={{ color: pink }}>
                  $280,000
                </Text>{" "}
                to open Whisker Watch at{" "}
                <Text weight="semibold">Jade at North Hyde Park</Text> — the
                founder’s favorite site. Capital funds a health-code-compliant dual-zone
                finish-out of the 1,666 SF ground-floor suite + patio, four months of
                runway, and launch in Tampa’s urban core.
              </Text>
              <Row gap={8} wrap>
                <PinkTag>608 N Willow · Suite 2</PinkTag>
                <PinkTag>1,666 + 895 SF patio</PinkTag>
                <PinkTag>DBPR split plan</PinkTag>
                <PinkTag>3D concept ready</PinkTag>
              </Row>
            </Stack>
          </CardBody>
        </Card>
        <Text tone="tertiary" style={{ fontSize: 12 }}>
          Concept 3D / floor plan are illustrative for planning — not as-built.
          Confirm rent, NNN, TI, and animal-use rights with ACRE and landlord before
          committing capital.
        </Text>
      </Stack>
    </Stack>
  );
}
