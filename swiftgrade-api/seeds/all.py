seed_names = (
    'admin_seeds',
    'migrate_files_and_urls_to_s3',
    'populate_login_history_seeds',
    'student_seeds',
    'restore_paper_results',
    'restore_user_popup_variable',
    'teacher_seeds',
)

PERFORM_FUNC_NAME = 'perform'


def import_from(module_name, name):
    module = __import__(module_name, fromlist=[name])
    return getattr(module, name)


def seed_decorate(func):
    def func_wrapper(*args, **kwargs):
        try:
            seed_name = args[0]
        except IndexError:
            seed_name = 'all'

        print('started ***%s*** seeds' % seed_name)
        func(*args, **kwargs)
        print('finished ***%s*** seeds' % seed_name)
    return func_wrapper


@seed_decorate
def perform_seed(seed_name):
    module_path = "seeds.%s" % seed_name
    perform_func = import_from(module_path, PERFORM_FUNC_NAME)
    perform_func()


@seed_decorate
def perform_seeds():
    for name in seed_names:
        perform_seed(name)


def perform(name):
    if name == 'all':
        return perform_seeds()

    if name in seed_names:
        return perform_seed(name)

    print("***%s*** seed not found" % name)
