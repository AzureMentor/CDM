// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
    CdmAttributeItem,
    CdmCorpusDefinition,
    CdmEntityAttributeDefinition,
    CdmEntityDefinition,
    CdmEntityReference,
    CdmManifestDefinition,
    CdmOperationCombineAttributes,
    CdmProjection,
    CdmTypeAttributeDefinition
} from '../../../internal';
import { LocalAdapter } from '../../../Storage';
import { testHelper } from '../../testHelper';
import { projectionTestUtils } from '../../Utilities/projectionTestUtils';
import { AttributeContextUtil } from './AttributeContextUtil';
import { TypeAttributeParam } from './TypeAttributeParam';
import { ProjectionOMTestUtil } from './ProjectionOMTestUtil';

/**
 * A test class for testing the CombineAttributes operation in a projection as well as Select 'one' in a resolution guidance
 */
describe('Cdm/Projection/ProjectionCombineTest', () => {
    /**
     * All possible combinations of the different resolution directives
     */
    const resOptsCombinations: string[][] = [
        [],
        ['referenceOnly'],
        ['normalized'],
        ['structured'],
        ['referenceOnly', 'normalized'],
        ['referenceOnly', 'structured'],
        ['normalized', 'structured'],
        ['referenceOnly', 'normalized', 'structured']
    ];

    /**
     * Path to foundations
     */
    const foundationJsonPath: string = 'cdm:/foundations.cdm.json';

    /**
     * The path between TestDataPath and TestName.
     */
    const testsSubpath: string = 'Cdm/Projection/TestProjectionCombine';

    /**
     * Test Entity Extends with a Resolution Guidance that selects 'one'
     */
    it('TestExtends', async () => {
        const testName: string = 'TestExtends';
        const entityName: string = 'Customer';

        for (const resOpt of resOptsCombinations) {
            await loadEntityForResolutionOptionAndSave(testName, entityName, resOpt);
        }
    });

    /**
     * Test Entity Extends with a Combine Attributes operation
     */
    it('TestExtendsProj', async () => {
        const testName: string = 'TestExtendsProj';
        const entityName: string = 'Customer';

        for (const resOpt of resOptsCombinations) {
            await loadEntityForResolutionOptionAndSave(testName, entityName, resOpt);
        }
    });

    /**
     * Test Entity Attribute with a Resolution Guidance that selects 'one'
     */
    it('TestEA', async () => {
        const testName: string = 'TestEA';
        const entityName: string = 'Customer';

        for (const resOpt of resOptsCombinations) {
            await loadEntityForResolutionOptionAndSave(testName, entityName, resOpt);
        }
    });

    /**
     * Test Entity Attribute with a Combine Attributes operation
     */
    it('TestEAProj', async () => {
        const testName: string = 'TestEAProj';
        const entityName: string = 'Customer';

        for (const resOpt of resOptsCombinations) {
            await loadEntityForResolutionOptionAndSave(testName, entityName, resOpt);
        }
    });

    /**
     * Test Entity Attribute with a Combine Attributes operation but IsPolymorphicSource flag set to false
     */
    it('TestFalseProj', async () => {
        const testName: string = 'TestFalseProj';
        const entityName: string = 'Customer';

        for (const resOpt of resOptsCombinations) {
            await loadEntityForResolutionOptionAndSave(testName, entityName, resOpt);
        }
    });

    /**
     * Test a Combine Attributes operation with an empty select list
     */
    it('TestEmptyProj', async () => {
        const testName: string = 'TestEmptyProj';
        const entityName: string = 'Customer';

        for (const resOpt of resOptsCombinations) {
            await loadEntityForResolutionOptionAndSave(testName, entityName, resOpt);
        }
    });

    /**
     * Test a collection of Combine Attributes operation
     */
    it('TestCollProj', async () => {
        const testName: string = 'TestCollProj';
        const entityName: string = 'Customer';

        for (const resOpt of resOptsCombinations) {
            await loadEntityForResolutionOptionAndSave(testName, entityName, resOpt);
        }
    });

    /**
     * Test Nested Combine Attributes operations
     */
    it('TestNestedProj', async () => {
        const testName: string = 'TestNestedProj';
        const entityName: string = 'Customer';

        for (const resOpt of resOptsCombinations) {
            await loadEntityForResolutionOptionAndSave(testName, entityName, resOpt);
        }
    });

    /**
     * Test Multiple Nested Operations with Combine including ArrayExpansion and Rename
     */
    it('TestMultiProj', async () => {
        const testName: string = 'TestMultiProj';
        const entityName: string = 'Customer';

        for (const resOpt of resOptsCombinations) {
            await loadEntityForResolutionOptionAndSave(testName, entityName, resOpt);
        }
    });

    /**
     * Test a Combine Attributes operation with condition set to false
     */
    it('TestCondProj', async () => {
        const testName: string = 'TestCondProj';
        const entityName: string = 'Customer';

        for (const resOpt of resOptsCombinations) {
            await loadEntityForResolutionOptionAndSave(testName, entityName, resOpt);
        }
    });

    /**
     * Test Nested Combine with Rename Operation
     */
    it('TestRenProj', async () => {
        const testName: string = 'TestRenProj';
        const entityName: string = 'Customer';

        for (const resOpt of resOptsCombinations) {
            await loadEntityForResolutionOptionAndSave(testName, entityName, resOpt);
        }
    });

    /**
     * Test Entity Attribute with a Combine Attributes operation that selects a common already 'merged' attribute (e.g. IsPrimary)
     */
    it('TestCommProj', async () => {
        const testName: string = 'TestCommProj';
        const entityName: string = 'Customer';

        for (const resOpt of resOptsCombinations) {
            await loadEntityForResolutionOptionAndSave(testName, entityName, resOpt);
        }
    });

    /**
     * Test a Combine Attributes operation by selecting missing attributes
     */
    it('TestMissProj', async () => {
        const testName: string = 'TestMissProj';
        const entityName: string = 'Customer';

        for (const resOpt of resOptsCombinations) {
            await loadEntityForResolutionOptionAndSave(testName, entityName, resOpt);
        }
    });

    /**
     * Test a Combine Attributes operation with a different sequence of selection attributes
     */
    it('TestSeqProj', async () => {
        const testName: string = 'TestSeqProj';
        const entityName: string = 'Customer';

        for (const resOpt of resOptsCombinations) {
            await loadEntityForResolutionOptionAndSave(testName, entityName, resOpt);
        }
    });

    /**
     * Test for object model
     */
    it('TestEAProjOM', async () => {
        const className: string = 'TestProjectionCombine';
        const testName: string = 'TestEAProjOM';

        const entityName_Email: string = 'Email';
        const attributeParams_Email: TypeAttributeParam[] = [];
        attributeParams_Email.push(new TypeAttributeParam(`EmailID`, `string`, `identifiedBy`));
        attributeParams_Email.push(new TypeAttributeParam(`Address`, `string`, `hasA`));
        attributeParams_Email.push(new TypeAttributeParam(`IsPrimary`, `boolean`, `hasA`));

        const entityName_Phone: string = 'Phone';
        const attributeParams_Phone: TypeAttributeParam[] = [];
        attributeParams_Phone.push(new TypeAttributeParam(`PhoneID`, `string`, `identifiedBy`));
        attributeParams_Phone.push(new TypeAttributeParam(`Number`, `string`, `hasA`));
        attributeParams_Phone.push(new TypeAttributeParam(`IsPrimary`, `boolean`, `hasA`));

        const entityName_Social: string = 'Social';
        const attributeParams_Social: TypeAttributeParam[] = [];
        attributeParams_Social.push(new TypeAttributeParam(`SocialID`, `string`, `identifiedBy`));
        attributeParams_Social.push(new TypeAttributeParam(`Account`, `string`, `hasA`));
        attributeParams_Social.push(new TypeAttributeParam(`IsPrimary`, `boolean`, `hasA`));

        const entityName_Customer: string = 'Customer';
        const attributeParams_Customer: TypeAttributeParam[] = [];
        attributeParams_Customer.push(new TypeAttributeParam(`CustomerName`, `string`, `hasA`));

        const selectedAttributes: string[] = [`EmailID`, `PhoneID`, `SocialID`];

        const util: ProjectionOMTestUtil = new ProjectionOMTestUtil(className, testName);
        const entity_Email: CdmEntityDefinition = util.CreateBasicEntity(entityName_Email, attributeParams_Email);
        util.validateBasicEntity(entity_Email, entityName_Email, attributeParams_Email);

        const entity_Phone: CdmEntityDefinition = util.CreateBasicEntity(entityName_Phone, attributeParams_Phone);
        util.validateBasicEntity(entity_Phone, entityName_Phone, attributeParams_Phone);

        const entity_Social: CdmEntityDefinition = util.CreateBasicEntity(entityName_Social, attributeParams_Social);
        util.validateBasicEntity(entity_Social, entityName_Social, attributeParams_Social);

        const entity_Customer: CdmEntityDefinition = util.CreateBasicEntity(entityName_Customer, attributeParams_Customer);
        util.validateBasicEntity(entity_Customer, entityName_Customer, attributeParams_Customer);

        const projection_Customer: CdmProjection = util.createProjection(entity_Customer.entityName);
        const typeAttribute_MergeInto: CdmTypeAttributeDefinition = util.createTypeAttribute(`MergeInto`, `string`, `hasA`);
        const operation_CombineAttributes: CdmOperationCombineAttributes = util.createOperationCombineAttributes(projection_Customer, selectedAttributes, typeAttribute_MergeInto);
        const projectionEntityRef_Customer: CdmEntityReference = util.createProjectionInlineEntityReference(projection_Customer);

        const entityAttribute_ContactAt: CdmEntityAttributeDefinition = util.createEntityAttribute(`ContactAt`, projectionEntityRef_Customer);
        entity_Customer.attributes.push(entityAttribute_ContactAt);

        for (const resOpts of resOptsCombinations) {
            await util.getAndValidateResolvedEntity(entity_Customer, resOpts);
        }

        await util.defaultManifest.saveAsAsync(util.manifestDocName, true);
    });

    /**
     * Loads an entity, resolves it, and then validates the generated attribute contexts
     */
    async function loadEntityForResolutionOptionAndSave(testName: string, entityName: string, resOpts: string[]): Promise<void> {
        const expectedOutputPath: string = testHelper.getExpectedOutputFolderPath(testsSubpath, testName);
        const fileNameSuffix: string = projectionTestUtils.getResolutionOptionNameSuffix(resOpts);

        const corpus: CdmCorpusDefinition = testHelper.getLocalCorpus(testsSubpath, testName);
        corpus.storage.mount('expected', new LocalAdapter(expectedOutputPath));
        const manifest: CdmManifestDefinition = await corpus.fetchObjectAsync<CdmManifestDefinition>(`local:/default.manifest.cdm.json`);

        const entity: CdmEntityDefinition = await corpus.fetchObjectAsync<CdmEntityDefinition>(`local:/${entityName}.cdm.json/${entityName}`);
        const resolvedEntity: CdmEntityDefinition = await projectionTestUtils.getResolvedEntity(corpus, entity, resOpts, true);

        await validateResolvedAttributes(corpus, resolvedEntity, entityName, fileNameSuffix);

        await AttributeContextUtil.validateAttributeContext(corpus, expectedOutputPath, `${entityName}${fileNameSuffix}`, resolvedEntity);
    }

    /**
     * Validate the list of resolved attributes against an expected list
     */
    async function validateResolvedAttributes(corpus: CdmCorpusDefinition, actualResolvedEntity: CdmEntityDefinition, entityName: string, fileNameSuffix: string) {
        const expectedResolvedEntity: CdmEntityDefinition = await corpus.fetchObjectAsync<CdmEntityDefinition>(`expected:/Resolved_${entityName}${fileNameSuffix}.cdm.json/Resolved_${entityName}${fileNameSuffix}`);

        expect(actualResolvedEntity.attributes.length)
            .toEqual(expectedResolvedEntity.attributes.length);

        for (let i: number = 0; i < expectedResolvedEntity.attributes.length; i++) {
            expect((actualResolvedEntity.attributes.allItems[i] as CdmAttributeItem).fetchObjectDefinitionName())
                .toEqual((expectedResolvedEntity.attributes.allItems[i] as CdmAttributeItem).fetchObjectDefinitionName());
        }
    }
});
