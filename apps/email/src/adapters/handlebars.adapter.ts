import { EmailTemplates } from '@app/contracts/email';
import { readFile } from 'fs';
import { compile } from 'handlebars';
import * as path from 'path';

export class HandlebarsAdapter {
  private readonly compiledTemplates = new Map<
    string,
    HandlebarsTemplateDelegate
  >();

  // Template path is relative to the dist/apps/email/templates directory
  private getTemplatePath(template: EmailTemplates): string {
    const templatesDir = path.join(process.cwd(), 'dist/apps/email/templates');

    return path.join(templatesDir, `${template}.hbs`);
  }

  private async compile(
    templateName: EmailTemplates,
  ): Promise<HandlebarsTemplateDelegate> {
    if (this.compiledTemplates.has(templateName)) {
      return this.compiledTemplates.get(
        templateName,
      ) as HandlebarsTemplateDelegate;
    }

    return new Promise((resolve, reject) => {
      const templatePath = this.getTemplatePath(templateName);

      readFile(templatePath, { encoding: 'utf-8' }, (err, templateFile) => {
        if (err) {
          return reject(`Unable to load template: ${templateName}`);
        }

        const template = compile(templateFile);
        this.compiledTemplates.set(templateName, template);

        resolve(template);
      });
    });
  }

  public async render(
    templateName: EmailTemplates,
    context?: Record<string, any>,
  ) {
    const template = await this.compile(templateName);

    return template(context);
  }
}
