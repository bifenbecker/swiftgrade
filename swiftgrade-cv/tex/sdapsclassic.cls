%%
%% This is file `sdapsclassic.cls',
%% generated with the docstrip utility.
%%
%% The original source files were:
%%
%% sdapsclassic.dtx  (with options: `class')
%% 
%% This is a generated file.
%% 
%% Copyright (C) 2015 by Benjamin Berg <benjamin@sipsolutions.net>
%% 
%% This work may be distributed and/or modified under the
%% conditions of the LaTeX Project Public License, either version 1.3c
%% of this license or (at your option) any later version.
%% The latest version of this license is in
%% The latest version of this license is in
%%   http://www.latex-project.org/lppl.txt
%% 
\NeedsTeXFormat{LaTeX2e}[1999/12/01]
\ProvidesClass{sdapsclassic}
    [2015/08/02 v0.1 Initial version of SDAPS classic class]
\RequirePackage{expl3}[2011/08/23]
\ExplSyntaxOn

\RequirePackage{sdapsbase}
\RequirePackage{sdapslayout}
\RequirePackage{verbatim}
\RequirePackage{scrkbase}

\DeclareOption{print_questionnaire_id}{\bool_gset_true:N\g_sdaps_print_questionnaire_id_bool\seq_gset_from_clist:Nn \g_sdaps_questionnaire_ids_seq {{NONE}}}
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{scrartcl}}

\newif\if@sdaps@draft\@sdaps@drafttrue
\DeclareOption{final}{\@sdaps@draftfalse}

\tl_gset:Nn\g_sdaps_style_tl{qr}%

\DefineFamily{SDAPS}
\DefineFamilyMember{SDAPS}

\DefineFamilyKey{SDAPS}{checkmode}[checkcorrect]%
{%
  \KOMA@set@ncmdkey{checkmode}{@tempa}{%
    {checkcorrect}{0},%
    {check}{1},%
    {fill}{2}%
  }{#1}%
  \ifcase \@tempa\relax
    \tl_gset:Nn\g_sdaps_checkmode_tl{checkcorrect}%
  \or
    \tl_gset:Nn\g_sdaps_checkmode_tl{check}%
  \or
    \tl_gset:Nn\g_sdaps_checkmode_tl{fill}%
  \fi
}

\DefineFamilyKey{SDAPS}{globalid}[]
{
  \tl_gset:Nn \g_sdaps_global_id_tl { #1 }
}

\DefineFamilyKey{SDAPS}{globalidlabel}[]
{
  \tl_gset:Nn \g_sdaps_global_id_label_tl { #1 }
}

\PassOptionsToClass{headings=small}{scrartcl}
\PassOptionsToClass{twoside}{scrartcl}

\seq_new:N \g_sdaps_questionnaire_ids_seq
\seq_gset_from_clist:Nn \g_sdaps_questionnaire_ids_seq {{}}

\FamilyProcessOptions{SDAPS}\relax

\LoadClass{scrartcl}

\RequirePackage{geometry}
\geometry{top=12mm}
\geometry{bottom=14mm}
\geometry{hmargin=12mm}
\geometry{includeheadfoot}
\geometry{headheight=\baselineskip}
\geometry{headsep=\baselineskip}
\geometry{footskip=12mm}

\RequirePackage{ifthen}

\RequirePackage[T1]{fontenc}

\RequirePackage{color}

\RequirePackage{amssymb}

\RequirePackage{refcount}

\RequirePackage{lastpage}

\RequirePackage{environ}

\usepackage{scrlayer-scrpage}
\clearpairofpagestyles
\chead*{\@title}
\cfoot*{\sdapspagemark}

\RequirePackage{url}
\RequirePackage{hyperref}

\RequirePackage{graphicx}

\RequirePackage{sectsty}

\RequirePackage{tabularx}

\RequirePackage{babel}

\RequirePackage{translator}
\usedictionary{translator-sdaps-dictionary}

\InputIfFileExists{sdaps.opt}{}{}


\setlength\lineskip{1\p@}
\setlength\normallineskip{1\p@}
\renewcommand\baselinestretch{}
\setlength{\parindent}{0pt}
\setlength{\parskip}{1.0ex \@plus 1.5ex \@minus -0.25ex}
\setlength\columnsep{10\p@}
\setlength\columnseprule{0\p@}
\renewcommand\section{\@startsection {section}{1}{\z@}%
      {-\parskip}%
      {\parskip}%
      {\normalfont\Large\bfseries\SS@sectfont}}
\renewcommand\subsection{
  \@startsection{subsection}{2}{\z@}%
      {0.5\parskip}%
      {0.25\parskip}% These are deleted again for questions
      {}%
}
\pagestyle{scrheadings}
\pagenumbering{arabic}
\raggedbottom
\onecolumn


\newkomafont{questionfont}{}
\newkomafont{choicefont}{}
\newkomafont{singlemarkchoicefont}{\usekomafont{choicefont}}

\def\_sdaps_classic_question#1{%
  \tl_if_empty:nTF{#1}{
    \refstepcounter{subsection}%
    \par%
  } {
    % #1 is nonempty
    \subsection{\usekomafont{questionfont}\strut\ignorespaces#1}%
    % This is extra spacing after the subsection is removed. By doing this we
    % get exactly one \parskip
    \nobreak%
    \vspace{-0.25\parskip}%
    \nobreak%
  }
}

\newenvironment{info}{%
  \group_begin:
    {
      \par
      % Prevent top skip glue from being inserted at the start of the page
      \topskip=0pt
      \noindent\hrule height 1pt%
      \nobreak
      \vspace{-\parskip}
      \nobreak
      \vspace{0.5ex}
      \nobreak
    }
}{%
    \par
    \nobreak
    \vspace{-\parskip}
    \nobreak
    \vspace{0.5ex}
    \nobreak
    \noindent\hrule height 1pt
  \group_end:
}

\definecolor{sectionbgcolor}{gray}{0.8}
\definecolor{sectionfgcolor}{gray}{0.0}

\newcommand{\sectbox}[1]{%
 \noindent\protect\colorbox{sectionbgcolor}{%
   \@tempdima=\hsize
   \advance\@tempdima by-2\fboxsep
   \protect\parbox{\@tempdima}{%
     \smallskip
     \raggedright % extra commands here
     \color{sectionfgcolor}\usekomafont{section}{#1} \smallskip
    }%
  }%
}

\sectionfont{\sectbox}

\setkomafont{disposition}{\normalfont}
\addtokomafont{section}{\bfseries\sffamily}

\def\smallskip{\vspace\smallskipamount}
\newskip\smallskipamount \smallskipamount=3pt  plus 1pt minus 1pt
\newskip\medskipamount   \medskipamount  =6pt  plus 2pt minus 2pt
\newskip\bigskipamount   \bigskipamount  =12pt plus 4pt minus 4pt

\cs_generate_variant:Nn \sdaps_textbox_hstretch:nnnnn { nVVnn }
\cs_generate_variant:Nn \sdaps_textbox_hstretch:nnnnn { VVVnn }
\cs_generate_variant:Nn \int_set:Nn { NV }


\bool_new:N \g__sdaps_classic_have_section
\bool_gset_false:N \g__sdaps_classic_have_section
\cs_new_eq:NN\_sdapsclassic_origsection\section
\renewcommand{\section}[1]{
  \bool_if:NT \g__sdaps_classic_have_section {
    \sdaps_qobject_end:n { section }
  }

  \_sdapsclassic_origsection{#1}
  \bool_gset_true:N \g__sdaps_classic_have_section
  \sdaps_qobject_begin:nnn { section }{ Head }{ #1 }
}

\cs_new_protected_nopar:Nn \sdaps_classic_ensure_section: {
  \bool_if:NF \g__sdaps_classic_have_section {
    % This is a bad hack to make the numbering start with zero
    \int_gdecr:N \g__sdaps_object_id_int
    \bool_gset_true:N \g__sdaps_classic_have_section
    \sdaps_qobject_begin:nnn { section }{ Head }{ }
      \sdaps_context_hook_end:n { \bool_gset_false:N \g__sdaps_classic_have_section }
  }
}

\tl_new:N \l_sdaps_classic_textbox_var_tl
\tl_new:N \l_sdaps_classic_textbox_text_tl
\keys_define:nn { sdapsclassic / textbox }
{
  var        .tl_set:N   = \l_sdaps_classic_textbox_var_tl,
  text       .tl_set:N   = \l_sdaps_classic_textbox_text_tl,
}

\providecommand{\textbox}{\@ifstar
    {\bool_set_false:N \l_tmpa_bool \_sdaps_classic_textbox }
    {\bool_set_true:N \l_tmpa_bool \_sdaps_classic_textbox }
}

\providecommand{\_sdaps_classic_textbox}[3][]
{
  \keys_set:nn { sdapsclassic / textbox } { #1 }

  \sdaps_classic_ensure_section:
  \_sdaps_classic_question{#3}

  \tl_if_empty:NTF \l_sdaps_classic_textbox_text_tl {
    \sdaps_qobject_begin:nnn { textbox } { Text } { #3 }
  } {
    \sdaps_qobject_begin:nnV { textbox } { Text } \l_sdaps_classic_textbox_text_tl
  }

  \bool_if:NTF \l_tmpa_bool {
    \sdaps_textbox_vhstretch:Vnn \l_sdaps_classic_textbox_var_tl { #2 } { 1 }
  }{
    \sdaps_textbox_vhstretch:Vnn \l_sdaps_classic_textbox_var_tl { #2 } { 0 }
  }

  \sdaps_qobject_end:n { textbox }
}

\newcounter{markcheckboxcount}
\setcounter{markcheckboxcount}{5}

\tl_new:N \l_sdaps_singlemark_var_tl
\int_new:N \l_sdaps_singlemark_count_int

\keys_define:nn { sdaps / singlemark }
{
  var        .tl_set:N   = \l_sdaps_singlemark_var_tl,

  % 0 is equivalent to using the markcheckboxcount counter
  count      .int_set:N  = \l_sdaps_singlemark_count_int,
  count      .initial:n  = 0,
}

\cs_new_protected_nopar:Nn \_sdaps_classic_dummy_checkbox_prepare:NN
{
  \group_begin:
    \sdaps_context_begin_local:
    \sdaps_context_disable_writing:
    \bool_if:NT #1 {
      \sdaps_context_append:nn { singlechoice } { draw_check=true }
      \sdaps_context_append:nn { multichoice } { draw_check=true }
    }
    \bool_if:NT #2 {
      \sdaps_context_append:nn { singlechoice } { fill=black }
      \sdaps_context_append:nn { multichoice } { fill=black }
    }
}

\cs_new_protected_nopar:Nn \_sdaps_classic_dummy_checkbox_single:
{
    \sdaps_checkbox_set_type:n { singlechoice }
    \sdaps_checkbox:nn { } { }
  \group_end:
  \ignorespaces
}

\cs_new_protected_nopar:Nn \_sdaps_classic_dummy_checkbox_multi:
{
    \sdaps_checkbox_set_type:n { multichoice }
    \sdaps_checkbox:nn { } { }
  \group_end:
  \ignorespaces
}

\providecommand{\checkbox}{
  \_sdaps_classic_dummy_checkbox_prepare:NN \c_false_bool \c_false_bool
  \@ifstar
    \_sdaps_classic_dummy_checkbox_single:
    \_sdaps_classic_dummy_checkbox_multi:
}
\providecommand{\checkedbox}{%
  \_sdaps_classic_dummy_checkbox_prepare:NN \c_true_bool \c_false_bool
  \@ifstar
    \_sdaps_classic_dummy_checkbox_single:
    \_sdaps_classic_dummy_checkbox_multi:
}
\providecommand{\filledbox}{%
  \_sdaps_classic_dummy_checkbox_prepare:NN \c_false_bool \c_true_bool
  \@ifstar
    \_sdaps_classic_dummy_checkbox_single:
    \_sdaps_classic_dummy_checkbox_multi:
}
\providecommand{\correctedbox}{%
  \_sdaps_classic_dummy_checkbox_prepare:NN \c_true_bool \c_true_bool
  \@ifstar
    \_sdaps_classic_dummy_checkbox_single:
    \_sdaps_classic_dummy_checkbox_multi:
}

\providecommand*{\singlemark}[4][]{%
  \sdaps_classic_ensure_section:

  \group_begin:

  \keys_set:nn { sdaps / singlemark } { #1 }

  \int_compare:nNnT { \l_sdaps_singlemark_count_int } = { 0 } {
    \int_set:Nn \l_sdaps_singlemark_count_int { \themarkcheckboxcount }
  }

  \_sdaps_classic_question{#2}%

  \sdaps_qobject_begin:nnn { singlemark } { range } { #2 }

  \sdaps_checkbox_set_type:n { singlechoice }

  \tl_if_empty:NF \l_sdaps_singlemark_var_tl {
    \sdaps_qobject_append_var:V \l_sdaps_singlemark_var_tl
  }

  \sdaps_range:nnn{lower}{0}{#3}
  \sdaps_range:nnn{upper}{\int_use:N\l_sdaps_singlemark_count_int-1}{#4}

  \begin{tabularx}{\linewidth}{X*{\int_use:N\l_sdaps_singlemark_count_int}{c}X}
    {\hfill\usekomafont{singlemarkchoicefont}\strut\ignorespaces#3} &
      \int_step_inline:nnnn { 1 } { 1 } { \int_use:N\l_sdaps_singlemark_count_int } { \sdaps_checkbox:nn { _ ##1 } { ##1 } & }
    {\usekomafont{singlemarkchoicefont}#4\hfill}\\%
  \end{tabularx}%

  \sdaps_qobject_end:n { singlemark }
  \group_end:
}

\dim_new:N \l__sdaps_classic_choicequestion_prevdepth_dim
\coffin_new:N \l__sdaps_classic_choicequestion_coffin

\msg_new:nnn { sdapsclassic } { choicequestion_wrong_mode } { Mode~should~always~be~vertical~inside~a~choicequestion.\\ This~likely~means~that~the~choicequestion~contains~content~other~than~one~of~the~permissable~macros. }

\msg_new:nnn { sdapsclassic } { choicequestion_unknown_key } { The~key~'#1'~is~unknown.\\If~you~are~migrating~from~the~old~class~then~you~need~to~add~'cols='~to~specify~the~number~of~columns. }%

\tl_new:N \l_sdaps_choicquestion_type_tl
\tl_new:N \l_sdaps_choicequestion_var_tl
\tl_new:N \l_sdaps_choicequestion_text_tl

\keys_define:nn { sdaps / choicequestion }
{
  var        .tl_set:N   = \l_sdaps_choicequestion_var_tl,
  text       .tl_set:N   = \l_sdaps_choicequestion_text_tl,

  type       .choices:nn  = { multichoice, singlechoice } { \tl_set:Nx \l_sdaps_choicquestion_type_tl { \l_keys_choice_tl } },
  type       .initial:n   = { multichoice },

  singlechoice .meta:n    = { type=singlechoice },
  multichoice  .meta:n    = { type=multichoice },

  unknown .code:n = \msg_error:nnV { sdapsclassic } { choicequestion_unknown_key } \l_keys_key_tl%
}

\newenvironment{choicequestion}[2][]{
  \group_begin:

  \sdaps_classic_ensure_section:

  \tl_clear:N \l_sdaps_choicequestion_var_tl
  \tl_clear:N \l_sdaps_choicequestion_text_tl

  \keys_set:nn { sdaps / choicequestion } { #1 }

  \_sdaps_classic_question{#2}%

  % Setup the context
  \tl_if_eq:VnTF \l_sdaps_choicquestion_type_tl { multichoice } {
    \tl_set:Nn \l_tmpa_tl { Choice }
  } {
    \tl_set:Nn \l_tmpa_tl { Option }
  }
  \tl_if_empty:NTF \l_sdaps_choicequestion_text_tl {
    \sdaps_qobject_begin:nVn { choicequestion } \l_tmpa_tl { #2 }
  } {
    \sdaps_qobject_begin:nVV { choicequestion } \l_tmpa_tl \l_sdaps_choicequestion_text_tl
  }

  \sdaps_checkbox_set_type:V \l_sdaps_choicquestion_type_tl

  \tl_if_empty:NF \l_sdaps_choicequestion_var_tl {
    \sdaps_qobject_append_var:V \l_sdaps_choicequestion_var_tl
  }

  \dim_set:Nn \l__sdaps_classic_choicequestion_prevdepth_dim { 1000pt }
  \coffin_clear:N \l__sdaps_classic_choicequestion_coffin

  % We have to be in vertical mode at this point.
  \if_mode_vertical:
    % Nothing
  \else:
    \msg_error:nn { sdapsclassic } { choicequestion_wrong_mode }
  \fi:

  % It is important to look like a paragraph, otherwise latex thinks there is
  % nothing between the two question sections and doesn't insert a voluntary
  % page break.
  \the\everypar

  % Paragraph like spacing
  \vspace{\parskip}

  \def\choicequestion_clubpenalty{\penalty\clubpenalty\def\choicequestion_clubpenalty{\relax}\def\choicequestion_clubpenalty{\penalty\widowpenalty}}
  \def\choicequestion_widowpenalty{}
}{
  \if_mode_vertical:
    % Nothing
  \else:
    \msg_error:nn { sdapsclassic } { choicequestion_wrong_mode }
  \fi:

  \choicequestion_widowpenalty
  \vbox:n { \skip_horizontal:N \@totalleftmargin \box_use:N \l__sdaps_classic_choicequestion_coffin }
  \prevdepth=\l__sdaps_classic_choicequestion_prevdepth_dim
  \coffin_clear:N \l__sdaps_classic_choicequestion_coffin
  \sdaps_qobject_end:n { choicequestion }

  \group_end:
  \vspace{\parskip}
}

\iow_new:N \l__sdaps_questionnaire_iow
\bool_new:N \l__sdaps_questionnaire_parse_direct_bool

\bool_new:N \l__sdaps_questionnaire_info_bool

\keys_define:nn { sdaps / questionnaire }
{
  info         .bool_set:N  = \l__sdaps_questionnaire_info_bool,
  info         .default:n   = true,
  info         .initial:n   = true,

  noinfo       .meta:n  = { info=false },
}

\cs_new_protected_nopar:Nn \_sdaps_classic_show_info:
{
  \bool_if:NT \l__sdaps_questionnaire_info_bool {
    \begin{info}
      \translate{infotext} \\[1ex]
      \tl_if_eq:VnTF \g_sdaps_checkmode_tl { checkcorrect } {
        \begin{tabularx}{\textwidth}{lXllll}
          \checkbox & \strut \translate{info-multi} & \hspace{2em} \checkedbox {} & \translate{info-cross} & \hspace{1em} \correctedbox {} & \translate{info-corrected} \\
          \checkbox* & \strut \translate{info-single} & \hspace{2em} \checkedbox* {} & \translate{info-cross} & \hspace{1em} \correctedbox* {} & \translate{info-corrected} \\
        \end{tabularx}
      } {
        \tl_if_eq:VnTF \g_sdaps_checkmode_tl { check } {
          \begin{tabularx}{\textwidth}{lXll}
            \checkbox & \strut \translate{info-multi} & \hspace{2em} \checkedbox {} & \translate{info-cross} \\
            \checkbox* & \strut \translate{info-single} & \hspace{2em} \checkedbox* {} & \translate{info-cross} \\
          \end{tabularx}
        } {
          \tl_if_eq:VnTF \g_sdaps_checkmode_tl { fill } {
            \begin{tabularx}{\textwidth}{lXll}
              \checkbox & \strut \translate{info-multi} & \hspace{2em} \filledbox {} & \translate{info-fill} \\
              \checkbox* & \strut \translate{info-single} & \hspace{2em} \filledbox* {} & \translate{info-fill} \\
            \end{tabularx}
          } {
            \PackageError{sdaps}{Sorry, there is no help text for the checkmode you have choosen right now! Please pass the noinfo optional argument to the questionnaire environment!}\@ehb %
          }
        }
      }
    \end{info}
  }
  \ignorespaces
}

\newenvironment { questionnaire } [ 1 ] []
{
  \keys_set:nn { sdaps / questionnaire } { #1 }

  \hypersetup{
    pdfauthor     = \@author,
    pdftitle      = \@title,
    pdfsubject    = sdaps questionnaire \@title,
    pdfkeywords   = sdaps questionnaire \@title
  }

  % If we only have one questionnaire ID, then parse the environment directly,
  % otherwise write it into a temporary file and input it multiple times.
  \group_begin:

  \if@twoside
    \bool_gset_true:N \g_sdaps_twoside_bool
  \else
    \bool_gset_false:N \g_sdaps_twoside_bool
  \fi

  % Enable all metadata writing by default
  \sdaps_context_enable_writing:

  \sdaps_info_write:x{Author=\exp_not:o{\@author}}
  \sdaps_info_write:x{Title=\exp_not:o{\@title}}

  \int_compare:nTF { \seq_count:N \g_sdaps_questionnaire_ids_seq <= 1 } {
    \bool_set_true:N \l__sdaps_questionnaire_parse_direct_bool

    % Set the questionnaire ID
    \seq_gpop_left:NN \g_sdaps_questionnaire_ids_seq \l_tmpa_tl
    \sdaps_set_questionnaire_id:V \l_tmpa_tl

    % And, begin the questionnaire
    \sdaps_begin:
      \_sdaps_classic_show_info:
  } {
    \bool_set_false:N \l__sdaps_questionnaire_parse_direct_bool

    % Write content into a file, see "verbatim" documentation for more information.
    % TODO: Allow multiple temporary files by postfixing with integer?
    \iow_open:Nn \l__sdaps_questionnaire_iow { \c_sys_jobname_str . questionnaire }
    \cs_set_eq:NN\do\@makeother\dospecials
    \catcode`\^^M\active
    \def\verbatim@processline{
      \iow_now:Nx \l__sdaps_questionnaire_iow {\the\verbatim@line}
    }
    \verbatim@
  }
} {
  \bool_if:NTF \l__sdaps_questionnaire_parse_direct_bool {
        % Just end everything, nothing else to do.
        % Make sure we always end the current paragraph.
        \par
      \sdaps_end:

    \group_end:
  } {
       % We are done inputting the questionnaire
       \iow_close:N \l__sdaps_questionnaire_iow
    \group_end:

    % Now cycle through all IDS and output it again.
    \group_begin:
      \seq_map_inline:Nn \g_sdaps_questionnaire_ids_seq {
        \sdaps_set_questionnaire_id:n { ##1 }

        % Reset a lot of global LaTeX counters
        \@ifundefined{c@page}{}{\setcounter{page}{1}}
        \@ifundefined{c@part}{}{\setcounter{part}{0}}
        \@ifundefined{c@chapter}{}{\setcounter{chapter}{0}}
        \@ifundefined{c@paragraph}{}{\setcounter{paragraph}{0}}
        \@ifundefined{c@subparagraph}{}{\setcounter{subparagraph}{0}}
        \@ifundefined{c@section}{}{\setcounter{section}{0}}
        \@ifundefined{c@subsection}{}{\setcounter{subsection}{0}}
        \@ifundefined{c@subsubsection}{}{\setcounter{subsubsection}{0}}
        \@ifundefined{c@equation}{}{\setcounter{equation}{0}}
        \@ifundefined{c@figure}{}{\setcounter{figure}{0}}
        \@ifundefined{c@table}{}{\setcounter{table}{0}}

        \sdaps_begin:
          \_sdaps_classic_show_info:
          \input{ \c_sys_jobname_str . questionnaire }
          % Make sure we always end the current paragraph.
          \par
        \sdaps_end:
        \newpage

        % Close the output file now (after the page has been shipped out)
        % XXX: This is a bit of a hack, as disabling metadata writing has side effects
        \iow_close:N \g_sdaps_infofile_iow

      }
    \group_end:
  }
}

\def\sdapspagemark{
  \sdaps_page_end:
}

\ExplSyntaxOff


\endinput
%%
%% End of file `sdapsclassic.cls'.
