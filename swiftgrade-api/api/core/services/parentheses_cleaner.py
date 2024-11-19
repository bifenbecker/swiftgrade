class ParenthesesCleaner(object):
    def removeInvalidParentheses(self, s, template):
        def findMinRemove(s):
            left_removed, right_removed = 0, 0
            for c in s:
                if c == template[0]:
                    left_removed += 1
                elif c == template[1]:
                    if not left_removed:
                        right_removed += 1
                    else:
                        left_removed -= 1
            return left_removed, right_removed

        def isValid(s):
            sum = 0
            for c in s:
                if c == template[0]:
                    sum += 1
                elif c == template[1]:
                    sum -= 1
                if sum < 0:
                    return False
            return sum == 0

        def removeInvalidParenthesesHelper(start, left_removed, right_removed):
            if left_removed == 0 and right_removed == 0:
                tmp = ""
                for i, c in enumerate(s):
                    if i not in removed:
                        tmp += c
                if isValid(tmp):
                    res.append(tmp)
                return

            for i in range(start, len(s)):
                if right_removed == 0 and left_removed > 0 and s[i] == template[0]:
                    if i == start or s[i] != s[i - 1]:
                        removed[i] = True
                        removeInvalidParenthesesHelper(i + 1, left_removed - 1, right_removed)
                        del removed[i]
                elif right_removed > 0 and s[i] == template[1]:
                    if i == start or s[i] != s[i - 1]:
                        removed[i] = True
                        removeInvalidParenthesesHelper(i + 1, left_removed, right_removed - 1)
                        del removed[i]

        res, removed = [], {}
        (left_removed, right_removed) = findMinRemove(s)
        removeInvalidParenthesesHelper(0, left_removed, right_removed)
        return res
