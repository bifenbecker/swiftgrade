import xxhash


class HashingService:
    @classmethod
    def calculate_hash(cls, string):
        return xxhash.xxh3_128(string).hexdigest()
