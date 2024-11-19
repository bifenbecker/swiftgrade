import React from 'react';
import _ from 'lodash';
import { getLightColor } from 'utils/helpers/colorHelpers';

import Algebra1 from './Algebra/Algebra1';
import Algebra2 from './Algebra/Algebra2';
import Algebra3 from './Algebra/Algebra3';
import Algebra4 from './Algebra/Algebra4';
import Algebra5 from './Algebra/Algebra5';
import Algebra6 from './Algebra/Algebra6';
import Algebra7 from './Algebra/Algebra7';
import Algebra8 from './Algebra/Algebra8';

import Astronomy1 from './Astronomy/Astronomy1';
import Astronomy2 from './Astronomy/Astronomy2';
import Astronomy3 from './Astronomy/Astronomy3';
import Astronomy4 from './Astronomy/Astronomy4';
import Astronomy5 from './Astronomy/Astronomy5';
import Astronomy6 from './Astronomy/Astronomy6';
import Astronomy7 from './Astronomy/Astronomy7';
import Astronomy8 from './Astronomy/Astronomy8';
import Astronomy9 from './Astronomy/Astronomy9';
import Astronomy10 from './Astronomy/Astronomy10';
import Astronomy11 from './Astronomy/Astronomy11';
import Astronomy12 from './Astronomy/Astronomy12';
import Astronomy13 from './Astronomy/Astronomy13';
import Astronomy14 from './Astronomy/Astronomy14';
import Astronomy15 from './Astronomy/Astronomy15';
import Astronomy16 from './Astronomy/Astronomy16';
import Astronomy17 from './Astronomy/Astronomy17';
import Astronomy18 from './Astronomy/Astronomy18';
import Astronomy19 from './Astronomy/Astronomy19';
import Astronomy20 from './Astronomy/Astronomy20';
import Astronomy21 from './Astronomy/Astronomy21';
import Astronomy22 from './Astronomy/Astronomy22';

import Biochemistry1 from './Biochemistry/Biochemistry1';
import Biochemistry2 from './Biochemistry/Biochemistry2';
import Biochemistry3 from './Biochemistry/Biochemistry3';
import Biochemistry4 from './Biochemistry/Biochemistry4';
import Biochemistry5 from './Biochemistry/Biochemistry5';
import Biochemistry6 from './Biochemistry/Biochemistry6';
import Biochemistry7 from './Biochemistry/Biochemistry7';
import Biochemistry8 from './Biochemistry/Biochemistry8';
import Biochemistry9 from './Biochemistry/Biochemistry9';
import Biochemistry10 from './Biochemistry/Biochemistry10';

import Biology1 from './Biology/Biology1';
import Biology2 from './Biology/Biology2';
import Biology3 from './Biology/Biology3';
import Biology4 from './Biology/Biology4';
import Biology5 from './Biology/Biology5';
import Biology6 from './Biology/Biology6';
import Biology7 from './Biology/Biology7';
import Biology8 from './Biology/Biology8';
import Biology9 from './Biology/Biology9';
import Biology10 from './Biology/Biology10';
import Biology11 from './Biology/Biology11';
import Biology12 from './Biology/Biology12';
import Biology13 from './Biology/Biology13';
import Biology14 from './Biology/Biology14';
import Biology15 from './Biology/Biology15';
import Biology16 from './Biology/Biology16';
import Biology17 from './Biology/Biology17';
import Biology18 from './Biology/Biology18';
import Biology19 from './Biology/Biology19';
import Biology20 from './Biology/Biology20';
import Biology21 from './Biology/Biology21';
import Biology22 from './Biology/Biology22';

import Botany1 from './Botany/Botany1';
import Botany2 from './Botany/Botany2';
import Botany3 from './Botany/Botany3';
import Botany4 from './Botany/Botany4';
import Botany5 from './Botany/Botany5';
import Botany6 from './Botany/Botany6';
import Botany7 from './Botany/Botany7';
import Botany8 from './Botany/Botany8';
import Botany9 from './Botany/Botany9';
import Botany10 from './Botany/Botany10';
import Botany11 from './Botany/Botany11';
import Botany12 from './Botany/Botany12';
import Botany13 from './Botany/Botany13';
import Botany14 from './Botany/Botany14';

import Business1 from './Business/Business1';
import Business2 from './Business/Business2';
import Business3 from './Business/Business3';
import Business4 from './Business/Business4';
import Business5 from './Business/Business5';
import Business6 from './Business/Business6';
import Business7 from './Business/Business7';
import Business8 from './Business/Business8';
import Business9 from './Business/Business9';
import Business10 from './Business/Business10';

import Calculus1 from './Calculus/Calculus1';
import Calculus2 from './Calculus/Calculus2';
import Calculus3 from './Calculus/Calculus3';
import Calculus4 from './Calculus/Calculus4';
import Calculus5 from './Calculus/Calculus5';
import Calculus6 from './Calculus/Calculus6';
import Calculus7 from './Calculus/Calculus7';
import Calculus8 from './Calculus/Calculus8';
import Calculus9 from './Calculus/Calculus9';
import Calculus10 from './Calculus/Calculus10';
import Calculus11 from './Calculus/Calculus11';
import Calculus12 from './Calculus/Calculus12';

import Chemistry1 from './Chemistry/Chemistry1';
import Chemistry2 from './Chemistry/Chemistry2';
import Chemistry3 from './Chemistry/Chemistry3';
import Chemistry4 from './Chemistry/Chemistry4';
import Chemistry5 from './Chemistry/Chemistry5';
import Chemistry6 from './Chemistry/Chemistry6';
import Chemistry7 from './Chemistry/Chemistry7';
import Chemistry8 from './Chemistry/Chemistry8';
import Chemistry9 from './Chemistry/Chemistry9';
import Chemistry10 from './Chemistry/Chemistry10';
import Chemistry11 from './Chemistry/Chemistry11';
import Chemistry12 from './Chemistry/Chemistry12';
import Chemistry13 from './Chemistry/Chemistry13';
import Chemistry14 from './Chemistry/Chemistry14';
import Chemistry15 from './Chemistry/Chemistry15';
import Chemistry16 from './Chemistry/Chemistry16';
import Chemistry17 from './Chemistry/Chemistry17';
import Chemistry18 from './Chemistry/Chemistry18';
import Chemistry19 from './Chemistry/Chemistry19';
import Chemistry20 from './Chemistry/Chemistry20';
import Chemistry21 from './Chemistry/Chemistry21';
import Chemistry22 from './Chemistry/Chemistry22';
import Chemistry23 from './Chemistry/Chemistry23';
import Chemistry24 from './Chemistry/Chemistry24';
import Chemistry25 from './Chemistry/Chemistry25';

import Computer1 from './Computer/Computer1';
import Computer2 from './Computer/Computer2';
import Computer3 from './Computer/Computer3';
import Computer4 from './Computer/Computer4';
import Computer5 from './Computer/Computer5';
import Computer6 from './Computer/Computer6';
import Computer7 from './Computer/Computer7';
import Computer8 from './Computer/Computer8';
import Computer9 from './Computer/Computer9';
import Computer10 from './Computer/Computer10';
import Computer11 from './Computer/Computer11';
import Computer12 from './Computer/Computer12';
import Computer13 from './Computer/Computer13';
import Computer14 from './Computer/Computer14';
import Computer15 from './Computer/Computer15';

import Different1 from './Different/Different1';
import Different2 from './Different/Different2';
import Different3 from './Different/Different3';
import Different4 from './Different/Different4';
import Different5 from './Different/Different5';
import Different6 from './Different/Different6';
import Different7 from './Different/Different7';
import Different8 from './Different/Different8';
import Different9 from './Different/Different9';
import Different10 from './Different/Different10';
import Different11 from './Different/Different11';
import Different12 from './Different/Different12';
import Different13 from './Different/Different13';
import Different14 from './Different/Different14';
import Different15 from './Different/Different15';
import Different16 from './Different/Different16';
import Different17 from './Different/Different17';
import Different18 from './Different/Different18';
import Different19 from './Different/Different19';
import Different20 from './Different/Different20';
import Different21 from './Different/Different21';
import Different22 from './Different/Different22';
import Different23 from './Different/Different23';
import Different24 from './Different/Different24';
import Different25 from './Different/Different25';

import Electricity1 from './Electricity/Electricity1';
import Electricity2 from './Electricity/Electricity2';
import Electricity3 from './Electricity/Electricity3';
import Electricity4 from './Electricity/Electricity4';
import Electricity5 from './Electricity/Electricity5';
import Electricity6 from './Electricity/Electricity6';
import Electricity7 from './Electricity/Electricity7';
import Electricity8 from './Electricity/Electricity8';
import Electricity9 from './Electricity/Electricity9';
import Electricity10 from './Electricity/Electricity10';
import Electricity11 from './Electricity/Electricity11';
import Electricity12 from './Electricity/Electricity12';
import Electricity13 from './Electricity/Electricity13';
import Electricity14 from './Electricity/Electricity14';

import Engineering1 from './Engineering/Engineering1';
import Engineering2 from './Engineering/Engineering2';
import Engineering3 from './Engineering/Engineering3';
import Engineering4 from './Engineering/Engineering4';
import Engineering5 from './Engineering/Engineering5';
import Engineering6 from './Engineering/Engineering6';
import Engineering7 from './Engineering/Engineering7';
import Engineering8 from './Engineering/Engineering8';
import Engineering9 from './Engineering/Engineering9';
import Engineering10 from './Engineering/Engineering10';
import Engineering11 from './Engineering/Engineering11';
import Engineering12 from './Engineering/Engineering12';
import Engineering13 from './Engineering/Engineering13';
import Engineering14 from './Engineering/Engineering14';
import Engineering15 from './Engineering/Engineering15';
import Engineering16 from './Engineering/Engineering16';

import Environment1 from './Environment/Environment1';
import Environment2 from './Environment/Environment2';
import Environment3 from './Environment/Environment3';
import Environment4 from './Environment/Environment4';
import Environment5 from './Environment/Environment5';
import Environment6 from './Environment/Environment6';
import Environment7 from './Environment/Environment7';
import Environment8 from './Environment/Environment8';
import Environment9 from './Environment/Environment9';
import Environment10 from './Environment/Environment10';
import Environment11 from './Environment/Environment11';
import Environment12 from './Environment/Environment12';
import Environment13 from './Environment/Environment13';
import Environment14 from './Environment/Environment14';
import Environment15 from './Environment/Environment15';

import ESL1 from './ESL/ESL1';
import ESL2 from './ESL/ESL2';
import ESL3 from './ESL/ESL3';
import ESL4 from './ESL/ESL4';
import ESL5 from './ESL/ESL5';
import ESL6 from './ESL/ESL6';
import ESL7 from './ESL/ESL7';

import Geography1 from './Geography/Geography1';
import Geography2 from './Geography/Geography2';
import Geography3 from './Geography/Geography3';
import Geography4 from './Geography/Geography4';
import Geography5 from './Geography/Geography5';
import Geography6 from './Geography/Geography6';
import Geography7 from './Geography/Geography7';
import Geography8 from './Geography/Geography8';
import Geography9 from './Geography/Geography9';
import Geography10 from './Geography/Geography10';
import Geography11 from './Geography/Geography11';
import Geography12 from './Geography/Geography12';
import Geography13 from './Geography/Geography13';
import Geography14 from './Geography/Geography14';
import Geography15 from './Geography/Geography15';
import Geography16 from './Geography/Geography16';
import Geography17 from './Geography/Geography17';
import Geography18 from './Geography/Geography18';
import Geography19 from './Geography/Geography19';

import Geology1 from './Geology/Geology1';
import Geology2 from './Geology/Geology2';
import Geology3 from './Geology/Geology3';
import Geology4 from './Geology/Geology4';
import Geology5 from './Geology/Geology5';
import Geology6 from './Geology/Geology6';
import Geology7 from './Geology/Geology7';
import Geology8 from './Geology/Geology8';
import Geology9 from './Geology/Geology9';
import Geology10 from './Geology/Geology10';
import Geology11 from './Geology/Geology11';
import Geology12 from './Geology/Geology12';
import Geology13 from './Geology/Geology13';
import Geology14 from './Geology/Geology14';
import Geology15 from './Geology/Geology15';
import Geology16 from './Geology/Geology16';
import Geology17 from './Geology/Geology17';
import Geology18 from './Geology/Geology18';

import Geometry1 from './Geometry/Geometry1';
import Geometry2 from './Geometry/Geometry2';
import Geometry3 from './Geometry/Geometry3';
import Geometry4 from './Geometry/Geometry4';
import Geometry5 from './Geometry/Geometry5';
import Geometry6 from './Geometry/Geometry6';
import Geometry7 from './Geometry/Geometry7';
import Geometry8 from './Geometry/Geometry8';
import Geometry9 from './Geometry/Geometry9';
import Geometry10 from './Geometry/Geometry10';
import Geometry11 from './Geometry/Geometry11';
import Geometry12 from './Geometry/Geometry12';
import Geometry13 from './Geometry/Geometry13';

import Government1 from './Government/Government1';
import Government2 from './Government/Government2';
import Government3 from './Government/Government3';
import Government4 from './Government/Government4';
import Government5 from './Government/Government5';
import Government6 from './Government/Government6';
import Government7 from './Government/Government7';
import Government8 from './Government/Government8';
import Government9 from './Government/Government9';
import Government10 from './Government/Government10';
import Government11 from './Government/Government11';
import Government12 from './Government/Government12';
import Government13 from './Government/Government13';
import Government14 from './Government/Government14';
import Government15 from './Government/Government15';
import Government16 from './Government/Government16';
import Government17 from './Government/Government17';

import Health1 from './Health/Health1';
import Health2 from './Health/Health2';
import Health3 from './Health/Health3';
import Health4 from './Health/Health4';
import Health5 from './Health/Health5';
import Health6 from './Health/Health6';
import Health7 from './Health/Health7';
import Health8 from './Health/Health8';
import Health9 from './Health/Health9';
import Health10 from './Health/Health10';
import Health11 from './Health/Health11';
import Health12 from './Health/Health12';
import Health13 from './Health/Health13';
import Health14 from './Health/Health14';
import Health15 from './Health/Health15';
import Health16 from './Health/Health16';

import History1 from './History/History1';
import History2 from './History/History2';
import History3 from './History/History3';
import History4 from './History/History4';
import History5 from './History/History5';
import History6 from './History/History6';
import History7 from './History/History7';
import History8 from './History/History8';
import History9 from './History/History9';
import History10 from './History/History10';
import History11 from './History/History11';
import History12 from './History/History12';
import History13 from './History/History13';
import History14 from './History/History14';
import History15 from './History/History15';

import Law1 from './Law/Law1';
import Law2 from './Law/Law2';
import Law3 from './Law/Law3';
import Law4 from './Law/Law4';
import Law5 from './Law/Law5';
import Law6 from './Law/Law6';
import Law7 from './Law/Law7';
import Law8 from './Law/Law8';

import Language1 from './Language/Language1';
import Language2 from './Language/Language2';
import Language3 from './Language/Language3';
import Language4 from './Language/Language4';
import Language5 from './Language/Language5';
import Language6 from './Language/Language6';
import Language7 from './Language/Language7';
import Language8 from './Language/Language8';
import Language9 from './Language/Language9';
import Language10 from './Language/Language10';
import Language11 from './Language/Language11';
import Language12 from './Language/Language12';
import Language13 from './Language/Language13';
import Language14 from './Language/Language14';
import Language15 from './Language/Language15';
import Language16 from './Language/Language16';
import Language17 from './Language/Language17';
import Language18 from './Language/Language18';

import Marketing1 from './Marketing/Marketing1';
import Marketing2 from './Marketing/Marketing2';
import Marketing3 from './Marketing/Marketing3';
import Marketing4 from './Marketing/Marketing4';
import Marketing5 from './Marketing/Marketing5';
import Marketing6 from './Marketing/Marketing6';
import Marketing7 from './Marketing/Marketing7';
import Marketing8 from './Marketing/Marketing8';

import Math1 from './Math/Math1';
import Math2 from './Math/Math2';
import Math3 from './Math/Math3';
import Math4 from './Math/Math4';
import Math5 from './Math/Math5';
import Math6 from './Math/Math6';
import Math7 from './Math/Math7';
import Math8 from './Math/Math8';
import Math9 from './Math/Math9';
import Math10 from './Math/Math10';
import Math11 from './Math/Math11';
import Math12 from './Math/Math12';
import Math13 from './Math/Math13';
import Math14 from './Math/Math14';
import Math15 from './Math/Math15';
import Math16 from './Math/Math16';
import Math17 from './Math/Math17';
import Math18 from './Math/Math18';
import Math19 from './Math/Math19';

import Nuclear1 from './Nuclear/Nuclear1';
import Nuclear2 from './Nuclear/Nuclear2';
import Nuclear3 from './Nuclear/Nuclear3';
import Nuclear4 from './Nuclear/Nuclear4';
import Nuclear5 from './Nuclear/Nuclear5';
import Nuclear6 from './Nuclear/Nuclear6';
import Nuclear7 from './Nuclear/Nuclear7';
import Nuclear8 from './Nuclear/Nuclear8';
import Nuclear9 from './Nuclear/Nuclear9';

import Physics1 from './Physics/Physics1';
import Physics2 from './Physics/Physics2';
import Physics3 from './Physics/Physics3';
import Physics4 from './Physics/Physics4';
import Physics5 from './Physics/Physics5';
import Physics6 from './Physics/Physics6';
import Physics7 from './Physics/Physics7';
import Physics8 from './Physics/Physics8';
import Physics9 from './Physics/Physics9';
import Physics10 from './Physics/Physics10';
import Physics11 from './Physics/Physics11';
import Physics12 from './Physics/Physics12';
import Physics13 from './Physics/Physics13';
import Physics14 from './Physics/Physics14';
import Physics15 from './Physics/Physics15';
import Physics16 from './Physics/Physics16';
import Physics17 from './Physics/Physics17';
import Physics18 from './Physics/Physics18';
import Physics19 from './Physics/Physics19';
import Physics20 from './Physics/Physics20';
import Physics21 from './Physics/Physics21';
import Physics22 from './Physics/Physics22';
import Physics23 from './Physics/Physics23';
import Physics24 from './Physics/Physics24';
import Physics25 from './Physics/Physics25';

import Probability1 from './Probability/Probability1';
import Probability2 from './Probability/Probability2';
import Probability3 from './Probability/Probability3';
import Probability4 from './Probability/Probability4';
import Probability5 from './Probability/Probability5';

import Quantum1 from './Quantum/Quantum1';
import Quantum2 from './Quantum/Quantum2';
import Quantum3 from './Quantum/Quantum3';
import Quantum4 from './Quantum/Quantum4';

import Relativity1 from './Relativity/Relativity1';
import Relativity2 from './Relativity/Relativity2';
import Relativity3 from './Relativity/Relativity3';
import Relativity4 from './Relativity/Relativity4';
import Relativity5 from './Relativity/Relativity5';
import Relativity6 from './Relativity/Relativity6';
import Relativity7 from './Relativity/Relativity7';
import Relativity8 from './Relativity/Relativity8';
import Relativity9 from './Relativity/Relativity9';
import Relativity10 from './Relativity/Relativity10';
import Relativity11 from './Relativity/Relativity11';

import Science1 from './Science/Science1';
import Science2 from './Science/Science2';
import Science3 from './Science/Science3';
import Science4 from './Science/Science4';
import Science5 from './Science/Science5';
import Science6 from './Science/Science6';
import Science7 from './Science/Science7';
import Science8 from './Science/Science8';
import Science9 from './Science/Science9';
import Science10 from './Science/Science10';
import Science11 from './Science/Science11';
import Science12 from './Science/Science12';
import Science13 from './Science/Science13';
import Science14 from './Science/Science14';
import Science15 from './Science/Science15';
import Science16 from './Science/Science16';
import Science17 from './Science/Science17';
import Science18 from './Science/Science18';
import Science19 from './Science/Science19';
import Science20 from './Science/Science20';
import Science21 from './Science/Science21';
import Science22 from './Science/Science22';
import Science23 from './Science/Science23';
import Science24 from './Science/Science24';
import Science25 from './Science/Science25';
import Science26 from './Science/Science26';
import Science27 from './Science/Science27';
import Science28 from './Science/Science28';
import Science29 from './Science/Science29';
import Science30 from './Science/Science30';
import Science31 from './Science/Science31';
import Science32 from './Science/Science32';
import Science33 from './Science/Science33';
import Science34 from './Science/Science34';
import Science35 from './Science/Science35';
import Science36 from './Science/Science36';
import Science37 from './Science/Science37';

import Socials1 from './Socials/Socials1';
import Socials2 from './Socials/Socials2';
import Socials3 from './Socials/Socials3';
import Socials4 from './Socials/Socials4';
import Socials5 from './Socials/Socials5';
import Socials6 from './Socials/Socials6';
import Socials7 from './Socials/Socials7';
import Socials8 from './Socials/Socials8';
import Socials9 from './Socials/Socials9';

import Statistics1 from './Statistics/Statistics1';
import Statistics2 from './Statistics/Statistics2';
import Statistics3 from './Statistics/Statistics3';
import Statistics4 from './Statistics/Statistics4';
import Statistics5 from './Statistics/Statistics5';
import Statistics6 from './Statistics/Statistics6';
import Statistics7 from './Statistics/Statistics7';
import Statistics8 from './Statistics/Statistics8';
import Statistics9 from './Statistics/Statistics9';
import Statistics10 from './Statistics/Statistics10';
import Statistics11 from './Statistics/Statistics11';

import Triginometry1 from './Triginometry/Triginometry1';
import Triginometry2 from './Triginometry/Triginometry2';
import Triginometry3 from './Triginometry/Triginometry3';
import Triginometry4 from './Triginometry/Triginometry4';
import Triginometry5 from './Triginometry/Triginometry5';
import Triginometry6 from './Triginometry/Triginometry6';
import Triginometry7 from './Triginometry/Triginometry7';
import Triginometry8 from './Triginometry/Triginometry8';
import Triginometry9 from './Triginometry/Triginometry9';
import Triginometry10 from './Triginometry/Triginometry10';
import Triginometry11 from './Triginometry/Triginometry11';
import Triginometry12 from './Triginometry/Triginometry12';
import Triginometry13 from './Triginometry/Triginometry13';
import Triginometry14 from './Triginometry/Triginometry14';

const AlgebraIcons = [Algebra1, Algebra2, Algebra3, Algebra4, Algebra5, Algebra6, Algebra7, Algebra8];
const AstronomyIcons = [
  Astronomy1,
  Astronomy2,
  Astronomy3,
  Astronomy4,
  Astronomy5,
  Astronomy6,
  Astronomy7,
  Astronomy8,
  Astronomy9,
  Astronomy10,
  Astronomy11,
  Astronomy12,
  Astronomy13,
  Astronomy14,
  Astronomy15,
  Astronomy16,
  Astronomy17,
  Astronomy18,
  Astronomy19,
  Astronomy20,
  Astronomy21,
  Astronomy22,
];
const BiochemistryIcons = [
  Biochemistry1,
  Biochemistry2,
  Biochemistry3,
  Biochemistry4,
  Biochemistry5,
  Biochemistry6,
  Biochemistry7,
  Biochemistry8,
  Biochemistry9,
  Biochemistry10,
];
const BiologyIcons = [
  Biology1,
  Biology2,
  Biology3,
  Biology4,
  Biology5,
  Biology6,
  Biology7,
  Biology8,
  Biology9,
  Biology10,
  Biology11,
  Biology12,
  Biology13,
  Biology14,
  Biology15,
  Biology16,
  Biology17,
  Biology18,
  Biology19,
  Biology20,
  Biology21,
  Biology22,
];
const BotanyIcons = [
  Botany1,
  Botany2,
  Botany3,
  Botany4,
  Botany5,
  Botany6,
  Botany7,
  Botany8,
  Botany9,
  Botany10,
  Botany11,
  Botany12,
  Botany13,
  Botany14,
];
const BusinessIcons = [
  Business1,
  Business2,
  Business3,
  Business4,
  Business5,
  Business6,
  Business7,
  Business8,
  Business9,
  Business10,
];
const CalculusIcons = [
  Calculus1,
  Calculus2,
  Calculus3,
  Calculus4,
  Calculus5,
  Calculus6,
  Calculus7,
  Calculus8,
  Calculus9,
  Calculus10,
  Calculus11,
  Calculus12,
];
const ChemistryIcons = [
  Chemistry1,
  Chemistry2,
  Chemistry3,
  Chemistry4,
  Chemistry5,
  Chemistry6,
  Chemistry7,
  Chemistry8,
  Chemistry9,
  Chemistry10,
  Chemistry11,
  Chemistry12,
  Chemistry13,
  Chemistry14,
  Chemistry15,
  Chemistry16,
  Chemistry17,
  Chemistry18,
  Chemistry19,
  Chemistry20,
  Chemistry21,
  Chemistry22,
  Chemistry23,
  Chemistry24,
  Chemistry25,
];
const ComputerIcons = [
  Computer1,
  Computer2,
  Computer3,
  Computer4,
  Computer5,
  Computer6,
  Computer7,
  Computer8,
  Computer9,
  Computer10,
  Computer11,
  Computer12,
  Computer13,
  Computer14,
  Computer15,
];
const DifferentIcons = [
  Different1,
  Different2,
  Different3,
  Different4,
  Different5,
  Different6,
  Different7,
  Different8,
  Different9,
  Different10,
  Different11,
  Different12,
  Different13,
  Different14,
  Different15,
  Different16,
  Different17,
  Different18,
  Different19,
  Different20,
  Different21,
  Different22,
  Different23,
  Different24,
  Different25,
];
const ElectricityIcons = [
  Electricity1,
  Electricity2,
  Electricity3,
  Electricity4,
  Electricity5,
  Electricity6,
  Electricity7,
  Electricity8,
  Electricity9,
  Electricity10,
  Electricity11,
  Electricity12,
  Electricity13,
  Electricity14,
];
const EngineeringIcons = [
  Engineering1,
  Engineering2,
  Engineering3,
  Engineering4,
  Engineering5,
  Engineering6,
  Engineering7,
  Engineering8,
  Engineering9,
  Engineering10,
  Engineering11,
  Engineering12,
  Engineering13,
  Engineering14,
  Engineering15,
  Engineering16,
];
const EnvironmentIcons = [
  Environment1,
  Environment2,
  Environment3,
  Environment4,
  Environment5,
  Environment6,
  Environment7,
  Environment8,
  Environment9,
  Environment10,
  Environment11,
  Environment12,
  Environment13,
  Environment14,
  Environment15,
];
const ESLIcons = [ESL1, ESL2, ESL3, ESL4, ESL5, ESL6, ESL7];
const GeographyIcons = [
  Geography1,
  Geography2,
  Geography3,
  Geography4,
  Geography5,
  Geography6,
  Geography7,
  Geography8,
  Geography9,
  Geography10,
  Geography11,
  Geography12,
  Geography13,
  Geography14,
  Geography15,
  Geography16,
  Geography17,
  Geography18,
  Geography19,
];
const GeologyIcons = [
  Geology1,
  Geology2,
  Geology3,
  Geology4,
  Geology5,
  Geology6,
  Geology7,
  Geology8,
  Geology9,
  Geology10,
  Geology11,
  Geology12,
  Geology13,
  Geology14,
  Geology15,
  Geology16,
  Geology17,
  Geology18,
];
const GeometryIcons = [
  Geometry1,
  Geometry2,
  Geometry3,
  Geometry4,
  Geometry5,
  Geometry6,
  Geometry7,
  Geometry8,
  Geometry9,
  Geometry10,
  Geometry11,
  Geometry12,
  Geometry13,
];
const GovernmentIcons = [
  Government1,
  Government2,
  Government3,
  Government4,
  Government5,
  Government6,
  Government7,
  Government8,
  Government9,
  Government10,
  Government11,
  Government12,
  Government13,
  Government14,
  Government15,
  Government16,
  Government17,
];
const HealthIcons = [
  Health1,
  Health2,
  Health3,
  Health4,
  Health5,
  Health6,
  Health7,
  Health8,
  Health9,
  Health10,
  Health11,
  Health12,
  Health13,
  Health14,
  Health15,
  Health16,
];
const HistoryIcons = [
  History1,
  History2,
  History3,
  History4,
  History5,
  History6,
  History7,
  History8,
  History9,
  History10,
  History11,
  History12,
  History13,
  History14,
  History15,
];
const LanguageIcons = [
  Language1,
  Language2,
  Language3,
  Language4,
  Language5,
  Language6,
  Language7,
  Language8,
  Language9,
  Language10,
  Language11,
  Language12,
  Language13,
  Language14,
  Language15,
  Language16,
  Language17,
  Language18,
];
const LawIcons = [Law1, Law2, Law3, Law4, Law5, Law6, Law7, Law8];
const MarketingIcons = [Marketing1, Marketing2, Marketing3, Marketing4, Marketing5, Marketing6, Marketing7, Marketing8];
const MathIcons = [
  Math1,
  Math2,
  Math3,
  Math4,
  Math5,
  Math6,
  Math7,
  Math8,
  Math9,
  Math10,
  Math11,
  Math12,
  Math13,
  Math14,
  Math15,
  Math16,
  Math17,
  Math18,
  Math19,
];
const NuclearIcons = [Nuclear1, Nuclear2, Nuclear3, Nuclear4, Nuclear5, Nuclear6, Nuclear7, Nuclear8, Nuclear9];
const PhysicsIcons = [
  Physics1,
  Physics2,
  Physics3,
  Physics4,
  Physics5,
  Physics6,
  Physics7,
  Physics8,
  Physics9,
  Physics10,
  Physics11,
  Physics12,
  Physics13,
  Physics14,
  Physics15,
  Physics16,
  Physics17,
  Physics18,
  Physics19,
  Physics20,
  Physics21,
  Physics22,
  Physics23,
  Physics24,
  Physics25,
];
const ProbabilityIcons = [Probability1, Probability2, Probability3, Probability4, Probability5];
const QuantumIcons = [Quantum1, Quantum2, Quantum3, Quantum4];
const RelativityIcons = [
  Relativity1,
  Relativity2,
  Relativity3,
  Relativity4,
  Relativity5,
  Relativity6,
  Relativity7,
  Relativity8,
  Relativity9,
  Relativity10,
  Relativity11,
];
const ScienceIcons = [
  Science1,
  Science2,
  Science3,
  Science4,
  Science5,
  Science6,
  Science7,
  Science8,
  Science9,
  Science10,
  Science11,
  Science12,
  Science13,
  Science14,
  Science15,
  Science16,
  Science17,
  Science18,
  Science19,
  Science20,
  Science21,
  Science22,
  Science23,
  Science24,
  Science25,
  Science26,
  Science27,
  Science28,
  Science29,
  Science30,
  Science31,
  Science32,
  Science33,
  Science34,
  Science35,
  Science36,
  Science37,
];

const SocialsIcons = [Socials1, Socials2, Socials3, Socials4, Socials5, Socials6, Socials7, Socials8, Socials9];

const StatisticIcons = [
  Statistics1,
  Statistics2,
  Statistics3,
  Statistics4,
  Statistics5,
  Statistics6,
  Statistics7,
  Statistics8,
  Statistics9,
  Statistics10,
  Statistics11,
];
const TrigonometryIcons = [
  Triginometry1,
  Triginometry2,
  Triginometry3,
  Triginometry4,
  Triginometry5,
  Triginometry6,
  Triginometry7,
  Triginometry8,
  Triginometry9,
  Triginometry10,
  Triginometry11,
  Triginometry12,
  Triginometry13,
  Triginometry14,
];

const DATA = {
  algebra: AlgebraIcons,
  astronomy: AstronomyIcons,
  biochemistry: BiochemistryIcons,
  biology: BiologyIcons,
  botany: BotanyIcons,
  business: BusinessIcons,
  calculus: CalculusIcons,
  chemistry: ChemistryIcons,
  computer: ComputerIcons,
  different: DifferentIcons,
  electricity: ElectricityIcons,
  engineering: EngineeringIcons,
  environment: EnvironmentIcons,
  ESL: ESLIcons,
  geography: GeographyIcons,
  geology: GeologyIcons,
  geometry: GeometryIcons,
  government: GovernmentIcons,
  health: HealthIcons,
  history: HistoryIcons,
  language: LanguageIcons,
  law: LawIcons,
  marketing: MarketingIcons,
  math: MathIcons,
  nuclear: NuclearIcons,
  physics: PhysicsIcons,
  probability: ProbabilityIcons,
  quantum: QuantumIcons,
  relativity: RelativityIcons,
  science: ScienceIcons,
  social: SocialsIcons,
  statistic: StatisticIcons,
  trigonometry: TrigonometryIcons,
};

export const getIcon = (className, group) => {
  const { category, category_img_number: index, color } = group;
  const icons = _.get(DATA, category) || DATA.different;
  const Icon = _.isObject(icons[index]) ? icons[index] : icons[0];
  return (
    <div className={className}>
      <Icon color={getLightColor(color)} />
    </div>
  );
};
