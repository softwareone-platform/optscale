import uuid
import random
import string
from datetime import datetime
from unittest.mock import patch, PropertyMock
from freezegun import freeze_time

from auth.auth_server.models.models import (Type, User, Action, Role,
                                            Assignment, ActionGroup)
from auth.auth_server.models.models import gen_salt
from auth.auth_server.tests.unittests.test_api_base import TestAuthBase
from auth.auth_server.utils import hash_password

HIERARCHY_URL = "auth.auth_server.controllers.base." \
                "BaseController.get_downward_hierarchy"
RES_INFO_URL = "auth.auth_server.controllers.base." \
               "BaseController.get_resources_info"


class TestUser(TestAuthBase):
    def setUp(self, version="v2"):
        super().setUp(version)
        self.partner_scope_id = 'a5cb80ad-891d-4ec2-99de-ba4f20ba2c5d'
        self.customer1_scope_id = '19a00828-fbff-4318-8291-4b6c14a8066d'
        self.customer2_scope_id = '6cfea3e7-a037-4529-9a14-dd9c5151b1f5'
        self.group11_scope_id = 'be7b4d5e-33b6-40aa-bc6a-00c7d822606f'
        self.hierarchy = (
            {'root': {'null': {'partner': {
                'a5cb80ad-891d-4ec2-99de-ba4f20ba2c5d':
                    {'customer': {
                        '19a00828-fbff-4318-8291-4b6c14a8066d':
                            {'group': ['be7b4d5e-33b6-40aa-bc6a-00c7d822606f']
                             },
                        '6cfea3e7-a037-4529-9a14-dd9c5151b1f5':
                            {'group': ['e8b8b4e9-a92d-40b5-a5db-b38bf5314ef9',
                                       '42667dde-0427-49be-9541-8e99362ee96e']
                             },
                    }},
                '843f42c4-76b5-467f-b5e3-f7370b1235d6': {'customer': {}}}}}})
        admin_user = self.create_root_user()
        session = self.db_session
        type_partner = Type(id_=10, name='partner', parent=admin_user.type)
        type_customer = Type(id_=20, name='customer', parent=type_partner)
        type_group = Type(id_=30, name='group', parent=type_customer)
        self.user_type_id = int(type_group.id)
        salt = gen_salt()
        self.user_partner_email = 'partner@domain.com'
        self.user_partner_password = 'passwd!!!111'
        user_partner = User(
            self.user_partner_email, type_=type_partner,
            password=hash_password(
                self.user_partner_password, salt),
            display_name='Partner user', scope_id=self.partner_scope_id,
            salt=salt, type_id=type_partner.id)
        self.user_customer_password = 'p@sswRD!'
        user_customer = User(
            'customer@domain.com', type_=type_customer,
            salt=salt,
            display_name='Customer user',
            password=hash_password(
                self.user_customer_password, salt),
            scope_id=self.customer1_scope_id, type_id=type_customer.id)
        customer2_salt = gen_salt()
        self.user_customer2_password = 'p4$$w0rddd'
        self.user_customer2 = User(
            'customer2@domain.com', type_=type_customer,
            salt=customer2_salt,
            display_name='user customer2',
            password=hash_password(self.user_customer2_password,
                                   customer2_salt),
            scope_id=self.customer2_scope_id, type_id=type_customer.id)
        user_action_group = ActionGroup(name='Manage users and assignments')
        # admin action has type=root
        action_list_users = Action(name='LIST_USERS', type_=type_customer,
                                   action_group=user_action_group)
        action_create_user = Action(name='CREATE_USER',
                                    type_=type_customer,
                                    action_group=user_action_group)
        action_edit_user_info = Action(name='EDIT_USER_INFO',
                                       type_=type_customer,
                                       action_group=user_action_group)
        action_delete_user = Action(name='DELETE_USER', type_=admin_user.type,
                                    action_group=user_action_group)
        action_activate_user = Action(name='ACTIVATE_USER',
                                      type_=type_customer,
                                      action_group=user_action_group)
        action_reset_password = Action(name='RESET_USER_PASSWORD',
                                       type_=type_customer,
                                       action_group=user_action_group)
        admin_role = Role(name='ADMIN', type_=type_customer, lvl=type_customer,
                          scope_id=self.customer1_scope_id,
                          description='Admin')
        partner1_nodelete_role = Role(name='P1 No delete', type_=type_partner,
                                      lvl=type_customer,
                                      scope_id=self.partner_scope_id)
        partner1_delete_role = Role(name='P1 User Deleter', type_=type_partner,
                                    lvl=type_customer)
        session.add(type_partner)
        session.add(type_customer)
        session.add(type_group)
        session.add(user_partner)
        session.add(user_customer)
        session.add(self.user_customer2)
        session.add(action_list_users)
        session.add(action_create_user)
        session.add(action_edit_user_info)
        session.add(action_delete_user)
        session.add(action_activate_user)
        session.add(action_reset_password)
        session.add(admin_role)
        session.add(partner1_nodelete_role)
        session.add(partner1_delete_role)
        admin_role.assign_action(action_list_users)
        admin_role.assign_action(action_create_user)
        admin_role.assign_action(action_edit_user_info)
        admin_role.assign_action(action_delete_user)
        admin_role.assign_action(action_activate_user)
        admin_role.assign_action(action_reset_password)
        partner1_nodelete_role.assign_action(action_list_users)
        partner1_nodelete_role.assign_action(action_create_user)
        partner1_delete_role.assign_action(action_create_user)
        partner1_delete_role.assign_action(action_delete_user)
        assignment = Assignment(user_customer, admin_role,
                                type_customer, self.customer1_scope_id)
        assignment_p_c1 = Assignment(user_partner, partner1_nodelete_role,
                                     type_customer, self.customer1_scope_id)
        assignment_p_c1_del = Assignment(user_partner, partner1_delete_role,
                                         type_partner, self.partner_scope_id)

        session.add(assignment)
        session.add(assignment_p_c1)
        session.add(assignment_p_c1_del)
        session.commit()
        self.client.token = self.get_token(user_customer.email,
                                           self.user_customer_password)
        patch('auth.auth_server.controllers.user.'
              'UserController.domain_blacklist').start()
        patch('auth.auth_server.controllers.user.UserController.'
              'domain_whitelist', new_callable=PropertyMock,
              return_value=[]).start()

    def test_create_user(self):
        code, response = self._create_user()
        self.assertEqual(code, 201)
        self.assertIsNone(response.get('password'))
        self.assertIsNone(response.get('salt'))
        self.assertFalse(response['is_password_autogenerated'])

    def test_create_max_password_length(self,):
        password = ''.join(random.choice(
            string.ascii_lowercase + string.ascii_uppercase + string.digits +
            string.punctuation) for _ in range(20))
        email = 'test@email.com'
        code, _ = self._create_user(email=email, password=password)
        self.assertEqual(code, 201)
        self.client.secret = None
        code, _ = self.client.token_get(email, password)
        self.assertEqual(code, 201)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_delete_user(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        _, user = self._create_user()
        code, _ = self.client.user_delete(user['id'])
        self.assertEqual(code, 204)
        code, _ = self.client.user_get(user['id'])
        self.assertEqual(code, 404)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_edit_user_info(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        _, user = self._create_user(display_name='John Doe')
        code, user = self.client.user_update(user['id'],
                                             display_name='Mr. Anonymous')
        self.assertEqual(code, 200)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_create_user_info_whitespaced_display_name(self, p_hierarchy,
                                                       p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        code, response = self._create_user(display_name='       ')
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['reason'],
                         'display_name should not contain only whitespaces')

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_edit_user_info_whitespaced_display_name(self, p_hierarchy,
                                                     p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        _, user = self._create_user(display_name='John Doe')
        code, response = self.client.user_update(user['id'],
                                                 display_name='       ')
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['reason'],
                         'display_name should not contain only whitespaces')

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_edit_user_info_invalid(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        _, user = self._create_user(display_name='John Doe')
        code, response = self.client.user_update(user['id'],
                                                 display_name='')
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['reason'],
                         'display_name should contain 1-64 characters')

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_deactivate_user(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        _, user = self._create_user(display_name='Some User Name',
                                    is_active=True)
        code, user = self.client.user_update(user['id'],
                                             is_active=False)
        self.assertEqual(code, 200)
        self.assertEqual(user['is_active'], False)
        self.assertIsNone(user.get('password'))
        self.assertIsNone(user.get('salt'))

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_change_user_password(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        user_email = 'mrrobot@allcom.com'
        new_password = 'tr0l0l0!!11'
        _, user = self._create_user(email=user_email,
                                    display_name='Mr. Robot',
                                    is_active=True)
        code, user = self.client.user_update(user['id'],
                                             password=new_password)
        self.assertEqual(code, 200)
        self.assertIsNone(user.get('password'))
        self.assertIsNone(user.get('salt'))
        # try to authenticate with new password
        self.client.secret = None
        code, _ = self.client.token_get(user_email, new_password)
        self.assertEqual(code, 201)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_change_user_password_invalid(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        user_email = 'mrrobot@allcom.com'
        new_password = '123'
        _, user = self._create_user(email=user_email,
                                    display_name='Mr. Robot',
                                    is_active=True)
        code, response = self.client.user_update(user['id'],
                                                 password=new_password)
        self.assertEqual(code, 400)
        self.assertEqual(
            response['error']['reason'],
            'Validation error: Password must be at least 4 characters long')

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_get_user(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        resource_name = 'Group1'
        p_res_info.return_value = {
            self.group11_scope_id: {
                'name': resource_name, 'type': 'group'}}
        _, user = self._create_user()
        code, user1 = self.client.user_get(user['id'])
        self.assertEqual(code, 200)
        self.assertEqual(user['email'], user1['email'])
        self.assertEqual(user['id'], user1['id'])
        self.assertEqual(user['display_name'], user1['display_name'])
        self.assertIsNone(user.get('password'))
        self.assertIsNone(user.get('salt'))
        self.assertIsNone(user1.get('scope_name'))

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_list_user_assigned_resource_deleted(self, p_hierarchy,
                                                 p_res_info):
        del self.hierarchy['root']['null']['partner'][
            self.partner_scope_id]['customer'][self.customer1_scope_id]
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        code, _ = self.client.user_list()
        self.assertEqual(code, 200)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_list_p_c2(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        self.client.token = self.get_token(self.user_partner_email,
                                           self.user_partner_password)
        code, users = self.client.user_list()
        self.assertEqual(code, 200)
        self.assertEqual(
            len(list(filter(lambda x: x['id'] in
                            self.user_customer2.id, users))), 0)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_list_p_c1(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        self.client.token = self.get_token(self.user_partner_email,
                                           self.user_partner_password)
        code, users = self.client.user_list()
        self.assertEqual(code, 200)
        self.assertTrue(users)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_create_get_p_c1(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        self.client.token = self.get_token(self.user_partner_email,
                                           self.user_partner_password)
        user_params = {'email': 'test_pc_c1@all.com',
                       'password': 'p9iaidssd11!',
                       'display_name': 'Another test user'
                       }
        code, user = self.client.user_create(**user_params)
        self.assertEqual(code, 201)
        code, _ = self.client.user_get(user['id'])
        self.assertEqual(code, 200)

    @patch(HIERARCHY_URL)
    def test_get_p_c2(self, p_hierarchy):
        p_hierarchy.return_value = self.hierarchy
        self.client.token = self.get_token(self.user_partner_email,
                                           self.user_partner_password)
        self.client.secret = ''
        code, _ = self.client.user_get(self.user_customer2.id)
        self.assertEqual(code, 403)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_c2_edit_self(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        self.client.token = self.get_token(self.user_customer2.email,
                                           self.user_customer2_password)
        code, _ = self.client.user_update(self.user_customer2.id,
                                          display_name='Mr. User')
        self.assertEqual(code, 200)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_c2_reset_password_self(self, p_hierarchy, p_res_info):
        p_res_info.return_value = {}
        p_hierarchy.return_value = self.hierarchy
        self.client.token = self.get_token(self.user_customer2.email,
                                           self.user_customer2_password)
        code, _ = self.client.user_update(self.user_customer2.id,
                                          password='MY 4we$0me password')
        self.assertEqual(code, 200)

    def test_create_duplicate_user(self):
        user_email = 'user_name@email.org'
        _, response = self._create_user(email=user_email)
        code, response = self._create_user(email=user_email)
        self.assertEqual(code, 409)
        self.assertEqual(response['error']['reason'],
                         f'User {user_email} already exists')

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_recreate_deleted_user(self, p_hierarchy, p_res_info):
        p_res_info.return_value = {}
        p_hierarchy.return_value = self.hierarchy
        user_email = 'user_name@email.org'
        _, user = self._create_user(email=user_email)
        self.client.user_delete(user['id'])
        code, _ = self._create_user(email=user_email)
        self.assertEqual(code, 201)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_edit_change_email(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        _, user = self._create_user(display_name='John Doe')
        code, response = self.client.user_update(user['id'],
                                                 email='new_email@mail.com')
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['reason'],
                         'Parameter "email" is immutable')

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_login_inactive_user(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        user_password = 'Us3R P@$$w0rd'
        _, user = self._create_user(password=user_password,
                                    display_name='Some User Name',
                                    is_active=False,
                                    set_token=False)
        # try to get token, will raise 403, because user is inactive
        self.client.secret = None
        code, response = self.client.token_get(user['email'], user_password)
        self.assertEqual(code, 403)
        self.assertEqual(response['error']['reason'],
                         'User is inactive')

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_login_user_invalid_password(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        _, user = self._create_user(display_name='Some User Name')
        # use gen_salt to generate random invalid password
        self.client.secret = None
        code, response = self.client.token_get(user['email'], gen_salt())
        self.assertEqual(code, 403)
        self.assertEqual(response['error']['reason'],
                         'Email or password is invalid')

    def test_create_user_short_password(self):
        """
        password should be 4+ chars
        :return:
        """
        code, response = self._create_user(password='123')
        self.assertEqual(code, 400)
        self.assertEqual(
            response['error']['reason'],
            'Validation error: Password must be at least 4 characters long')

    def test_edit_not_existent_user(self):
        user_id = str(uuid.uuid4())
        code, response = self.client.user_update(user_id, name='new_name')
        self.assertEqual(code, 404)
        self.assertEqual(response['error']['reason'],
                         f'User with id {user_id} not found')

    def test_create_user_duplicated_name_scope(self):
        self._create_user(email="user1@mail.com")
        code, _ = self._create_user(email="user2@mail.com")
        self.assertEqual(code, 201)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_update_user_duplicated_name_scope(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        self._create_user(display_name='User1', email="user1@mail.com")
        _, user2 = self._create_user(display_name='User2',
                                     email="user2@mail.com")
        code, user2 = self.client.user_update(
            user2['id'], display_name='User1')
        self.assertEqual(code, 200)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_update_user_with_same_parameters(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        _, user1 = self._create_user(email="user1@mail.com")
        code, _ = self.client.user_update(
            user1['id'], display_name=user1['display_name'])
        self.assertEqual(code, 200)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_create_user_duplicated_name_with_deleted_user(
            self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        self._create_user(email="user1@mail.com")
        code, _ = self._create_user(email="user2@mail.com")
        self.assertEqual(code, 201)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_create_user_with_unexpected_param(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        for unexpected_param in ['param', 1, ""]:
            body = {
                'email': "user1@mail.com",
                'password': 'password',
                'display_name': 'name',
                'is_active': True,
                unexpected_param: 'value'
            }
            code, user = self.client.post('users', body)
            self.assertEqual(code, 400)
            self.assertEqual(user['error']['reason'],
                             f'Unexpected parameters: {unexpected_param}')

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_update_user_with_immutable(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        _, user = self._create_user(display_name='John Doe')
        for immutable_param in ['id', 'email', 'created_at', 'deleted_at',
                                'type_id', 'salt', 'scope_id',
                                'is_password_autogenerated']:
            body = {
                immutable_param: 'value'
            }
            code, upd_user = self.client.patch(f'users/{user["id"]}', body)
            self.assertEqual(code, 400)
            self.assertEqual(upd_user['error']['reason'],
                             f'Parameter "{immutable_param}" is immutable')

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_update_user_with_unexpected_params(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        _, user = self._create_user(display_name='John Doe')
        for unexpected_param in ['param', 3, '']:
            body = {
                unexpected_param: 'value'
            }
            code, upd_user = self.client.patch(f'users/{user["id"]}', body)
            self.assertEqual(code, 400)
            self.assertEqual(upd_user['error']['reason'],
                             f'Unexpected parameters: {unexpected_param}')

    def test_create_invalid_email(self,):
        code, response = self._create_user(email='wrongemail')
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['reason'],
                         'Email has invalid format')
        random_name = "".join(
            random.choice(string.ascii_lowercase) for _ in range(246))
        long_email = f'{random_name}@email.com'
        code, response = self._create_user(email=long_email)
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['reason'],
                         'email should contain 1-255 characters')

    def test_create_email_domain_blacklist(self):
        patch('auth.auth_server.controllers.user.'
              'UserController.domain_blacklist',
              new_callable=PropertyMock, return_value=['@example.my']).start()
        wl_email = 'user@user.user'
        code, response = self._create_user(email=wl_email)
        self.assertEqual(code, 201)

        bl_email = 'myexample@example.my'
        code, response = self._create_user(email=bl_email)
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['error_code'], 'OA0070')

        patch('auth.auth_server.controllers.user.'
              'UserController.domain_blacklist',
              new_callable=PropertyMock, return_value=['example.my']).start()
        code, response = self._create_user(email=bl_email)
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['error_code'], 'OA0070')

        code, response = self._create_user(email=bl_email.upper())
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['error_code'], 'OA0070')

    def test_create_user_invalid_display_name(self,):
        code, response = self._create_user(email='email@email.com',
                                           display_name=14)
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['reason'],
                         'display_name should be a string')

        long_display_name = "".join(
            random.choice(string.ascii_lowercase) for _ in range(256))
        for display_name in ['', long_display_name]:
            code, response = self._create_user(email='email@email.com',
                                               display_name=display_name)
            self.assertEqual(code, 400)
            self.assertEqual(response['error']['reason'],
                             'display_name should contain 1-255 characters')

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_update_user_short_password(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        _, user = self._create_user(email='email@email.com')
        code, user = self.client.user_update(user['id'], password='123')
        self.assertEqual(code, 400)
        self.assertEqual(
            user['error']['reason'],
            'Validation error: Password must be at least 4 characters long')

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_update_user_name_length(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        _, user = self._create_user(email='email@email.com')
        long_name = "".join(
            random.choice(string.ascii_lowercase) for _ in range(256))
        for name in ['', long_name]:
            code, patched_user = self.client.user_update(user['id'],
                                                         display_name=name)
            self.assertEqual(code, 400)
            self.assertEqual(patched_user['error']['reason'],
                             'display_name should contain 1-64 characters')

    def test_create_integer_password(self):
        email = 'test@email.com'
        code, response = self._create_user(email=email, password=123)
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['reason'],
                         'Validation error: Password must be a string')

    def test_invalid_request_body(self):
        code, response = self.client.post('users', '{"test": %}')
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['reason'],
                         'Incorrect request body received')

    def test_create_integer_email(self):
        code, response = self._create_user(email=123, password='password')
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['reason'],
                         'email should be a string')

    def test_creation_timestamp(self):
        with freeze_time() as frozen_datetime:
            _, user = self._create_user(email='test@email.com',
                                        display_name="test",
                                        set_token=False
                                        )
            first_user_created_at = user['created_at']
            frozen_datetime.tick()
            _, user = self._create_user(email='test1@email.com',
                                        display_name='test1',
                                        set_token=False
                                        )
            second_user_created_at = user['created_at']
            self.assertLess(first_user_created_at,
                            second_user_created_at)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_create_user_with_self_registration(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        body = {
            'email': "user1@mail.com",
            'password': 'password',
            'type_id': 30,
            'display_name': 'name',
            'is_active': True,
            'self_registration': True
        }
        code, _ = self.client.post('users', body)
        self.assertEqual(code, 400)

    def test_create_user_with_immutable(self):
        for immutable_param in ['deleted_at', 'created_at', 'id', 'salt',
                                'scope_id', 'is_password_autogenerated']:
            body = {
                'email': "user1@mail.com",
                'password': 'password',
                'display_name': 'name',
                'is_active': True,
                immutable_param: 'value'
            }
            self.client.token = None
            code, user = self.client.post('users', body)
            self.assertEqual(code, 400)
            self.assertEqual(user['error']['reason'],
                             f'Parameter "{immutable_param}" is immutable')

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_create_delete_self(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        self.client.token = self.get_token(self.user_partner_email,
                                           self.user_partner_password)
        user_params = {'email': 'test_pc_c1@all.com',
                       'password': 'p9iaidssd11!',
                       'display_name': 'Another test user'
                       }
        code, user = self.client.user_create(**user_params)
        self.client.secret = ''
        self.assertEqual(code, 201)
        code, _ = self.client.user_delete(user['id'])
        self.assertEqual(code, 403)
        self.client.token = self.get_token(user_params['email'],
                                           user_params['password'])
        code, _ = self.client.user_delete(user['id'])
        self.assertEqual(code, 204)

    def _create_user(self, email="test@email.com",
                     password="1Passw0rd1", display_name='Test user',
                     is_active=True, set_token=True):
        code, user = self.client.user_create(email, password,
                                             display_name=display_name,
                                             is_active=is_active)
        if code == 201 and set_token:
            self.client.token = self.get_token(email, password)
        return code, user

    def test_create_string_type_id(self):
        body = {
            'email': "user1@mail.com",
            'password': 'password',
            'type_id': 30,
            'display_name': 'name',
            'is_active': True,
        }
        code, response = self.client.post('users', body)
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['reason'],
                         'Parameter "type_id" is immutable')

    def test_check_existence(self):
        code, response = self.client.user_exists('test@email.com')
        self.assertEqual(code, 200)
        self.assertEqual(response['exists'], False)

        code, response = self.client.user_exists(
            'test@email.com', user_info=True)
        self.assertEqual(code, 200)
        self.assertEqual(response['exists'], False)
        self.assertIsNone(response.get('user_info'))

        self._create_user()
        code, response = self.client.user_exists('test@email.com')
        self.assertEqual(code, 200)
        self.assertEqual(response['exists'], True)

        code, response = self.client.user_exists('test@email.com',
                                                 user_info=True)
        self.assertEqual(code, 200)
        self.assertEqual(response['exists'], True)
        self.assertIsNotNone(response['user_info'])
        self.assertEqual(response['user_info']['email'], 'test@email.com')

    def test_list_bulk_ids(self):
        dt = datetime(2022, 5, 1)
        with freeze_time(dt):
            _, user_1 = self._create_user(email='user_1@email.com')
            u2_pass = 'password1'
            _, user_2 = self._create_user(email='user_2@email.com',
                                          password=u2_pass)
            _, user_3 = self._create_user(email='user_3@email.com')
        user_ids = [
            user_1['id'],
            user_2['id'],
            user_3['id'],
            str(uuid.uuid4()),
            None,
            1,
            ''
        ]
        code, users = self.client.user_list(user_ids)
        self.assertEqual(code, 200)
        self.assertEqual(len(users), 3)
        for user in users:
            self.assertTrue(
                user['id'] in [user_1['id'], user_2['id'], user_3['id']])
            self.assertEqual(user['last_login'], int(dt.timestamp()))
        dt_2 = datetime(2022, 5, 2)
        with freeze_time(dt_2):
            self.get_token(user_2['email'], u2_pass)
        code, users = self.client.user_list(user_ids)
        self.assertEqual(code, 200)
        self.assertEqual(len(users), 3)
        expected_last_login_map = {
            user_1['id']: int(dt.timestamp()),
            user_3['id']: int(dt.timestamp()),
            user_2['id']: int(dt_2.timestamp()),
        }
        for user in users:
            self.assertEqual(user['last_login'],
                             expected_last_login_map[user['id']])

    def test_list_bulk_ids_no_secret(self):
        _, user = self._create_user(email='user_1@email.com')
        self.client.secret = None
        code, _ = self.client.get(
            self.client.user_url() + self.client.query_url(
                user_id=[user['id']]))
        self.assertEqual(code, 401)

    def test_list_no_token(self):
        self.client.secret = None
        self.client.token = None
        code, _ = self.client.get(self.client.user_url())
        self.assertEqual(code, 401)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_patch_slack_connected(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        _, user = self._create_user(email='user_1@email.com')
        self.assertEqual(user['slack_connected'], False)

        for invalid_value in [1, 'true', 'invalid']:
            code, resp = self.client.user_update(
                user['id'], **{'slack_connected': invalid_value})
            self.assertEqual(code, 400)
            self.assertEqual(resp['error']['error_code'], 'OA0063')

        code, user = self.client.user_update(
            user['id'], **{'slack_connected': True})
        self.assertEqual(code, 200)
        self.assertEqual(user['slack_connected'], True)

    @patch(RES_INFO_URL)
    @patch(HIERARCHY_URL)
    def test_patch_jira_connected(self, p_hierarchy, p_res_info):
        p_hierarchy.return_value = self.hierarchy
        p_res_info.return_value = {}
        _, user = self._create_user(email='user_1@email.com')
        self.assertEqual(user['jira_connected'], False)

        for invalid_value in [1, 'true', 'invalid']:
            code, resp = self.client.user_update(
                user['id'], **{'jira_connected': invalid_value})
            self.assertEqual(code, 400)
            self.assertEqual(resp['error']['error_code'], 'OA0063')

        code, user = self.client.user_update(
            user['id'], **{'jira_connected': True})
        self.assertEqual(code, 200)
        self.assertEqual(user['jira_connected'], True)

    def test_create_email_domain_whitelist(self):
        patch('auth.auth_server.controllers.user.'
              'UserController.domain_blacklist',
              new_callable=PropertyMock, return_value=['@example.my']).start()
        patch('auth.auth_server.controllers.user.'
              'UserController.domain_whitelist',
              new_callable=PropertyMock, return_value=['@example.com']).start()

        wl_email = 'user@example.com'
        code, response = self._create_user(email=wl_email)
        self.assertEqual(code, 201)

        wl_email = 'user@example.ru'
        code, response = self._create_user(email=wl_email)
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['error_code'], 'OA0070')
        self.assertEqual(response['error']['params'], ['example.ru'])

        patch('auth.auth_server.controllers.user.'
              'UserController.domain_whitelist',
              new_callable=PropertyMock, return_value=['@example.my']).start()
        wl_email = 'user@example.com'
        code, response = self._create_user(email=wl_email)
        self.assertEqual(code, 400)

    def test_create_verified_user(self):
        secret = self.client.secret
        self.user_verified_mock.stop()
        self.client.secret = None
        code, user = self.client.user_create('test@email.com', 'pass1',
                                             display_name='test',
                                             verified=True)
        self.assertFalse(user['verified'])

        self.client.secret = secret
        code, user = self.client.user_create('test2@email.com', 'pass1',
                                             display_name='test',
                                             verified=True)
        self.assertTrue(user['verified'])

    def test_disabled_email_verification(self):
        patch('optscale_client.config_client.client.'
              'Client.disable_email_verification',
              return_value=True).start()
        self.user_verified_mock.stop()
        code, user = self.client.user_create('test@email.com', 'pass1',
                                             display_name='test')
        self.assertTrue(user['verified'])

    def test_password_strength(self):
        patch('optscale_client.config_client.client.'
              'Client.disable_email_verification',
              return_value=True).start()
        patch('optscale_client.config_client.client.Client.'
              'password_strength_settings',
              return_value={
                  'min_length': 10,
                  'min_lowercase': 2,
                  'min_uppercase': 2,
                  'min_digits': 2,
                  'min_special_chars': 2
              }).start()
        code, response = self.client.user_create(
            'test@email.com', 'a1_Pass', display_name='test')
        self.assertEqual(code, 400)
        self.assertEqual(
            response['error']['reason'],
            'Validation error: Password must be at least 10 characters long')

        code, response = self.client.user_create(
            'test@email.com', 'a1_PAsswo0rd', display_name='test')
        self.assertEqual(code, 400)
        self.assertEqual(
            response['error']['reason'],
            'Validation error: Password must contain at least 2 special chars')

        code, response = self.client.user_create(
            'test@email.com', 'a1_PAsswo00rd!', display_name='test')
        self.assertEqual(code, 201)
