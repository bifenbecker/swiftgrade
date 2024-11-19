from ..constants import DOT_SYMBOL


def filter_end_dot(answer: str) -> str:
    if answer[-1] == DOT_SYMBOL and answer.count(DOT_SYMBOL) == 1:
        return answer.rstrip(DOT_SYMBOL)
    return answer
