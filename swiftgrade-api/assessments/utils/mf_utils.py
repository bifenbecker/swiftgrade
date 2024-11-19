from sympy.parsing.latex import parse_latex

import sympy as sp


MATH_CONSTANTS = dict(pi=sp.pi, e=sp.E)


def parse_mf_to_latex(expr: str):
    formula = parse_latex(expr)
    return formula.subs(MATH_CONSTANTS)
