import {lint, ruleType} from '../../../src/rules/no-file-dependencies';
import {Severity} from '../../../src/types/severity';

describe('no-archive-dependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "optionalObject"', () => {
      expect(ruleType).toStrictEqual('optionalObject');
    });
  });

  describe('when package.json has node with an invalid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'test-module': 'file:local-directory',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {exceptions: ['grunt-npm-package-json-lint']});

      expect(response.lintId).toStrictEqual('no-file-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies');
      expect(response.lintMessage).toStrictEqual(
        'You are using dependencies via url to local file. Please use dependencies from npm.'
      );
    });
  });

  describe('when package.json has node with a invalid value and config exception', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'my-module': 'file:local-directory',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {exceptions: ['my-module']});

      expect(response).toBeNull();
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'my-module': 'username/repo',
          'my-other-module': '1.2.3',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {});

      expect(response).toBeNull();
    });
  });
});
